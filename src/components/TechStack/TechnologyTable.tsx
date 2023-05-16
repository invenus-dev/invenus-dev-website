import { StackTechnology } from 'TechStack';
import { TechnologyCell, PropertyHeader, MobileTechnology } from './TechnologyTableTools';

type Props = {
  techs: StackTechnology[];
};

const getTableHeaderItems = (tech: StackTechnology) => Object.keys(tech);

const TechnologyTable = ({ techs }: Props) => {
  if (!techs.length) {
    return null;
  }

  const tableHeaderItems = getTableHeaderItems(techs[0]);

  return (
    <>
      <div className="relative hidden rounded-2xl lg:block">
        <table className="w-full text-left ">
          <thead className="bg-primary-light text-sm uppercase">
            <tr>
              {tableHeaderItems.map((item, index) => (
                <PropertyHeader property={item} key={index} />
              ))}
            </tr>
          </thead>
          <tbody>
            {techs.map((tech, index) => (
              <tr className="border-b border-primary-light" key={index}>
                {tableHeaderItems.map((item, index) => (
                  <TechnologyCell value={tech[item]} type={item} key={index} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 xms:grid-cols-2 lg:hidden">
        {techs.map((tech, index) => (
          <div
            className="flex flex-row flex-wrap rounded-lg bg-primary-dark px-6 py-4 shadow-lg xms:flex-col"
            key={index}
          >
            <MobileTechnology tech={tech} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TechnologyTable;
