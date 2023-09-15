import { StackTechnologyGroup } from '../TechStack';

type Props = {
  stacks: StackTechnologyGroup[];
  currentStackHash: string | null;
  onSelect: (stackHash: string) => void;
};

const StackNavigation = ({ stacks, currentStackHash, onSelect }: Props) => {
  return (
    <div className="mb-6 flex justify-center">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-3 rounded-2xl px-2 py-2 lg:bg-primary-dark">
        {stacks.map(({ hash, title }) => (
          <li key={hash} className="">
            <a
              className={currentStackHash === hash ? 'tech-nav active' : 'tech-nav'}
              href={`#${hash}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(hash);
              }}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StackNavigation;
