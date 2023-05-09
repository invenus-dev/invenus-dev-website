import { StackTechnology } from 'TechStack';

type Props = {
  stack: StackTechnology;
};

const OneStack = ({ stack }: Props) => {
  return (
    <div className="px-2 py-8">
      <div className="flex flex-col space-y-8 md:flex-row md:items-center md:space-x-16">
        <div className="md:w-1/4 xl:w-1/3">
          <h4 className="font-mono font-semibold text-secondary">Technologies used:</h4>
          <ul className="mt-4  list-disc pl-5 font-mono xl:columns-2">
            {stack.techs.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <div className="md:w-3/4 xl:w-2/3">
          <h5 className="text-2xl">Our Story</h5>
          <p className="mt-2">{stack.trivia}</p>
        </div>
      </div>
    </div>
  );
};

export default OneStack;
