import { StackTechnologyGroup } from '../TechStack';

type Props = {
  stacks: StackTechnologyGroup[];
  currentStackHash: string | null;
  onSelect: (stackHash: string) => void;
};

const StackNavigation = ({ stacks, currentStackHash, onSelect }: Props) => {
  return (
    <ul className="flex flex-wrap justify-start gap-x-4 gap-y-3">
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
  );
};

export default StackNavigation;
