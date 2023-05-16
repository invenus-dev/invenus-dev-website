import useSWR from 'swr';
import AllStacks from 'components/TechStack/AllStacks';
import StackNavigation from 'components/TechStack/StackNavigation';
import OneStack from 'components/TechStack/OneStack';

import { useState, MouseEvent } from 'react';

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
  const [currentStackHash, setCurrentStackHash] = useState<string | null>(null);

  const onSelectHandler = (stackHash: string) => {
    setCurrentStackHash(stackHash === currentStackHash ? null : stackHash);
  };

  const onCloseClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentStackHash(null);
    onClose();
  };

  const currentStack = data?.find(({ hash }) => hash === currentStackHash);

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
      {data && currentStackHash && (
        <>
          <StackNavigation
            stacks={data}
            currentStackHash={currentStackHash}
            onSelect={onSelectHandler}
          />
          {currentStack && <OneStack stack={currentStack} />}
        </>
      )}
      {data && !currentStackHash && <AllStacks stacks={data} onSelect={onSelectHandler} />}
    </div>
  );
};

export default TechStack;