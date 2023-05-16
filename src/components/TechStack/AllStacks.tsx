import { StackTechnologyGroup } from 'TechStack';

type Props = {
  stacks: StackTechnologyGroup[];
  onSelect: (stackHash: string) => void;
};

const AllStacks = ({ stacks, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:gap-8">
      {stacks.map(({ hash, title, techs }) => (
        <button
          key={hash}
          className="group cursor-pointer rounded-2xl bg-primary-light px-4 py-6 drop-shadow-md hover:translate-x-px hover:translate-y-px"
          onClick={() => onSelect(hash)}
        >
          <h4 className="text-xl font-semibold text-tertiary group-hover:text-secondary-dark">
            {title}
          </h4>
          <p className="mt-2 font-mono text-sm text-tertiary-grade4">
            {techs.map((tech) => tech.Tech).join(', ')}
          </p>
        </button>
      ))}
    </div>
  );
};

export default AllStacks;
