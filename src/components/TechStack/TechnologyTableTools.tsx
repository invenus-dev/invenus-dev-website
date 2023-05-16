import classNames from 'classnames';
import { StackTechnology } from 'TechStack';

type TechnologyCellProps = {
  value: string | number;
  type: string;
  isTableCell?: boolean;
};

const EXPERTISE_STYLE_MAPPINGS = {
  Expert: 'font-semibold',
  Advanced: 'text-secondary',
  Intermediate: 'text-green-300',
  Brief: 'text-gray-300',
};

type ExpertiseKeys = keyof typeof EXPERTISE_STYLE_MAPPINGS;

// used to draw table cell values
export const TechnologyCell = ({ value, type, isTableCell = true }: TechnologyCellProps) => {
  const tdClass = 'px-4 py-1';
  const typeLower = type.toLowerCase();
  let outputValue = <>{value}</>;
  let extraClasses = '';

  if (typeLower === 'tech') {
    extraClasses = 'font-mono text-sm';
  }

  if (typeLower === 'since') {
    const currentYear = new Date().getFullYear();
    const years = currentYear - Number(value);
    outputValue = (
      <>
        {years} year{years > 1 && 's'}
      </>
    );
  }

  if (typeLower === 'projects') {
    const amount = Number((value as string).match(/^\d+/));
    let expertise = 'Brief';
    if (amount >= 100) {
      expertise = 'Expert';
    } else if (amount >= 10) {
      expertise = 'Advanced';
    } else if (amount >= 4) {
      expertise = 'Intermediate';
    }
    extraClasses = EXPERTISE_STYLE_MAPPINGS[expertise as ExpertiseKeys];
  }

  if (typeLower === 'level *' && value in EXPERTISE_STYLE_MAPPINGS) {
    extraClasses = EXPERTISE_STYLE_MAPPINGS[value as ExpertiseKeys];
  }

  if (typeLower === 'usual projects' || typeLower === 'notes') {
    extraClasses = 'text-sm';
  }

  return isTableCell ? (
    <td className={classNames(tdClass, extraClasses)}>{outputValue}</td>
  ) : (
    <span className={extraClasses}>{outputValue}</span>
  );
};

type PropertyHeaderProps = {
  property: string;
  isTableHead?: boolean;
};

// used to draw table header cells (properties)
export const PropertyHeader = ({ property, isTableHead = true }: PropertyHeaderProps) => {
  const thClass = 'px-4 py-2';
  const propertyLower = property.toLowerCase();
  let outputValue = <>{property}</>;

  if (propertyLower === 'tech') {
    outputValue = <></>;
  }

  if (propertyLower === 'since') {
    outputValue = <>Expertise</>;
  }

  if (propertyLower === 'level *') {
    outputValue = (
      <span
        className="cursor-help underline decoration-dotted underline-offset-2"
        title="Self-assessment; based on perceived value clients are paying for"
      >
        Level *
      </span>
    );
  }

  return isTableHead ? (
    <th className={thClass}>{outputValue}</th>
  ) : (
    <span className="text-sm text-gray-400">
      {!['usual projects', 'notes'].includes(propertyLower) ? (
        <>
          {outputValue}
          {propertyLower !== 'tech' && ': '}
        </>
      ) : null}
    </span>
  );
};

// used to draw mobile technology cube
type MobileTechnologyProps = {
  tech: StackTechnology;
};

const getTechnologyClass = (key: string) => {
  const keyLower = key.toLowerCase();
  const startClasses = 'xms:w-auto';
  const extraClasses = [];
  if (keyLower === 'tech') {
    extraClasses.push('mb-3');
  }
  if (['tech', 'usual projects', 'notes'].includes(keyLower)) {
    extraClasses.push('w-full');
  }
  if (['since', 'level *', 'projects'].includes(keyLower)) {
    extraClasses.push('pr-4 xms:pr-0');
  }
  return classNames(startClasses, extraClasses);
};

export const MobileTechnology = ({ tech }: MobileTechnologyProps) => {
  const techKeys = Object.keys(tech);

  return (
    <>
      {techKeys.map((key) => (
        <div key={key} className={getTechnologyClass(key)}>
          <PropertyHeader property={key} isTableHead={false} />
          <TechnologyCell value={tech[key]} type={key} isTableCell={false} />
        </div>
      ))}
    </>
  );
};
