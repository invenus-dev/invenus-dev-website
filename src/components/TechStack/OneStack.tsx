import { StackTechnologyGroup } from '../TechStack';
import TechnologyTable from './TechnologyTable';

type Props = {
  stack: StackTechnologyGroup;
};

const OneStack = ({ stack }: Props) => {
  const { content, techs, subtitle } = stack;
  return (
    <div className="px-2 pb-6 pt-6">
      <div>
        <h3 className="mb-4 text-lg text-secondary">{subtitle}</h3>
        <div className="flex flex-col space-y-5 sm:flex-row sm:space-x-10 sm:space-y-0">
          {content.map((contentPart, index) => (
            <p key={index} className="sm:max-w-sm">
              {contentPart}
            </p>
          ))}
        </div>
        <div className="mt-8 rounded-lg">
          <TechnologyTable techs={techs} />
        </div>
      </div>
    </div>
  );
};

export default OneStack;
