import { StackTechnology } from 'TechStack';

type Props = {
  stacks: StackTechnology[];
  currentStackHash: string | null;
  onSelect: (stackHash: string) => void;
};

const StackNavigation = ({ stacks, currentStackHash, onSelect }: Props) => {
  return (
    <ul className="flex justify-start space-x-6">
      {stacks.map(({ hash, title }) => (
        <li key={hash} className="">
          <a
            className={currentStackHash === hash ? 'tech-nav active' : 'tech-nav'}
            href={`#${hash}`}
            onClick={() => onSelect(hash)}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default StackNavigation;
