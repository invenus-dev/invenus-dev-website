import { StackTechnologyGroup } from '../TechStack';
import TechnologyTable from './TechnologyTable';

type Props = {
  stack: StackTechnologyGroup;
};

const OneStack = ({ stack }: Props) => {
  const { content, techs, subtitle } = stack;
  return (
    <div className="px-2 pb-6 pt-2">
      <div>
        <h3 className="mb-4 text-lg text-secondary">{subtitle}</h3>
        <div className="flex flex-col space-y-5 md:flex-row md:space-x-10 md:space-y-0">
          {content.map((contentPart, index) => (
            <p key={index} className="md:w-1/2 2xl:text-lg">
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
