import classNames from 'classnames';

type Props = {
  label: string;
  value: string;
  isVertical?: boolean;
  isYellow?: boolean;
};

const ContactLine = ({ label, value, isVertical = false, isYellow = false }: Props) => {
  const parsedValue = value.replace(/,\s/g, '<br />');
  return (
    <div
      className={classNames('mb-2 mt-1 flex', isVertical ? 'flex-col items-start' : 'items-center')}
    >
      <div className="mr-2 text-gray-500">{label}</div>
      <div
        className={classNames(
          'flex space-x-2 rounded-md px-4 py-2',
          isYellow ? 'bg-secondary' : 'bg-gray-200'
        )}
      >
        <div className="" dangerouslySetInnerHTML={{ __html: parsedValue }} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classNames('h-6 w-6', isYellow ? 'text-secondary-darker' : 'text-gray-600')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
          />
        </svg>
      </div>
    </div>
  );
};

export default ContactLine;
