import useSWR from 'swr';
import StackNavigation from './TechStack/StackNavigation';
import OneStack from './TechStack/OneStack';
import useTechParam from '../hooks/useTechParam';

export type StackTechnology = {
  Tech: string;
  Since: number;
  Projects: string;
  [key: string]: string | number;
};

export type StackTechnologyGroup = {
  title: string;
  subtitle: string;
  content: string[];
  hash: string;
  techs: StackTechnology[];
};

type Props = {
  stackFile: string;
};

const TechStack = ({ stackFile }: Props) => {
  const { data, error, isLoading } = useSWR<StackTechnologyGroup[]>(stackFile);
  const { currentTech, setCurrentTech } = useTechParam();

  const onSelectHandler = (stackHash: string) => {
    setCurrentTech(stackHash);
  };

  const currentStack = data?.find(({ hash }) => hash === currentTech);

  return (
    <div className="bg-primary px-6 py-16 text-tertiary-grade1 sm:rounded-3xl sm:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-center">
          <h3 className="mb-6 font-heading text-5xl">Our Tech Stack explained</h3>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error while loading data</div>}
        {data && (
          <>
            <StackNavigation
              stacks={data}
              currentStackHash={currentStack ? currentTech : data[0].hash}
              onSelect={onSelectHandler}
            />
            {currentStack ? <OneStack stack={currentStack} /> : <OneStack stack={data[0]} />}
          </>
        )}
      </div>
    </div>
  );
};

export default TechStack;
