import useSWR from 'swr';
import AllStacks from 'components/TechStack/AllStacks';
import StackNavigation from 'components/TechStack/StackNavigation';
import OneStack from 'components/TechStack/OneStack';
import useTechParam from 'hooks/useTechParam';
import { MouseEvent } from 'react';

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
  onClose: () => void;
};

const TechStack = ({ stackFile, onClose }: Props) => {
  const { data, error, isLoading } = useSWR<StackTechnologyGroup[]>(stackFile);
  const { currentTech, setCurrentTech } = useTechParam();

  const onSelectHandler = (stackHash: string) => {
    setCurrentTech(stackHash);
  };

  const onCloseClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentTech(null);
    onClose();
  };

  const currentStack = data?.find(({ hash }) => hash === currentTech);

  return (
    <div className="mx-auto max-w-screen-lg bg-primary px-6 pb-12 pt-6 text-tertiary-grade1 sm:rounded-lg sm:px-8">
      <div className="flex items-start justify-between space-x-4">
        <h3 className="mb-6 font-heading text-4xl">Our Tech Stack explained</h3>
        <a
          href="#close"
          className="inline-block w-14 flex-shrink-0 underline underline-offset-2 hover:text-secondary"
          onClick={onCloseClickHandler}
        >
          &times; close
        </a>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error while loading data</div>}
      {data && currentTech && (
        <>
          <StackNavigation
            stacks={data}
            currentStackHash={currentTech}
            onSelect={onSelectHandler}
          />
          {currentStack && <OneStack stack={currentStack} />}
        </>
      )}
      {data && !currentTech && <AllStacks stacks={data} onSelect={onSelectHandler} />}
    </div>
  );
};

export default TechStack;
