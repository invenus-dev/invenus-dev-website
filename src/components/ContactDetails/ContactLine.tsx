import classNames from 'classnames';
import { useState } from 'react';
type Props = {
  label: string;
  value: string;
  isVertical?: boolean;
  isYellow?: boolean;
};

const ContactLine = ({ label, value, isVertical = false, isYellow = false }: Props) => {
  const parsedValue = value.replace(/,\s/g, '<br />');
  const [isCopied, setIsCopied] = useState(false);
  const handleInteraction = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  return (
    <div
      className={classNames(
        'mb-2 mt-1 flex min-w-fit',
        isVertical ? 'flex-col items-start' : 'items-center'
      )}
    >
      <div
        className={classNames(
          'mr-4 text-sm xs:text-base',
          isYellow ? 'text-secondary-darker' : 'text-gray-500'
        )}
      >
        {label}
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleInteraction}
        onKeyUp={handleInteraction}
        className={classNames(
          'group relative flex cursor-pointer space-x-2 rounded-md px-4 py-2',
          isYellow ? 'bg-secondary' : 'bg-gray-100'
        )}
      >
        <div
          className={classNames(
            'absolute bottom-full mb-2 transform rounded bg-gray-700 px-2 py-1 text-sm text-white',
            isCopied ? 'animate-in' : 'hidden'
          )}
        >
          Copied to clipboard!
        </div>
        <div
          className="whitespace-nowrap text-sm xs:text-base"
          dangerouslySetInnerHTML={{ __html: parsedValue }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classNames('h-6 w-6', isYellow ? 'text-secondary-darker' : 'text-gray-500')}
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
