import useSWR from 'swr';

type StackTechnology = {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error while loading data</div>;

  return (
    <div>
      <h2>Tech Stack</h2>
      <ul>
        {data?.map((tech) => (
          <li key={tech.hash}>{tech.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
