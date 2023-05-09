import useSWR from 'swr';
import AllStacks from 'components/TechStack/AllStacks';
import StackNavigation from 'components/TechStack/StackNavigation';
import OneStack from 'components/TechStack/OneStack';

import { useState } from 'react';

export type StackTechnology = {
  title: string;
  trivia: string;
  hash: string;
  techs: string[];
};

type Props = {
  stackFile: string;
};

const TechStack = ({ stackFile }: Props) => {
  const { data, error, isLoading } = useSWR<StackTechnology[]>(stackFile);
  const [currentStackHash, setCurrentStackHash] = useState<string | null>(null);

  const onSelectHandler = (stackHash: string) => {
    setCurrentStackHash(stackHash === currentStackHash ? null : stackHash);
  };

  const currentStack = data?.find(({ hash }) => hash === currentStackHash);

  return (
    <div className="bg-primary px-6 pb-12 pt-6 text-tertiary-grade1 sm:rounded-lg sm:px-8">
      <h3 className="mb-6 font-heading text-3xl">Our Tech Stack explained</h3>
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
