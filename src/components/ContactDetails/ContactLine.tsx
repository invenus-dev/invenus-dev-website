/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ContactObject } from '../ContactDetails';

type Props = {
  item: ContactObject;
};

const getSvgIcon = (key: string) => {
  const withPrefix = (iconName: string) => `src/assets/icons/${iconName}.svg`;
  switch (key) {
    case 'email':
      return withPrefix('email');
    case 'phone':
      return withPrefix('phone');
    case 'location':
    case 'business':
      return withPrefix('place');
    case 'vat':
      return withPrefix('inventory');
  }
};

const ContactLine = ({ item }: Props) => {
  const { value, label, key, url } = item;
  const [isCopied, setIsCopied] = useState(false);

  const iconName = getSvgIcon(key);
  const isHeadquarters = key === 'business';
  const isIban = key === 'bank-eu-iban';

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
      className={classNames('mb-2 mt-1 flex min-w-fit items-center', [
        isHeadquarters ? 'flex-wrap sm:flex-nowrap' : '',
        isIban ? 'flex-wrap xms:flex-nowrap' : '',
      ])}
    >
      {iconName && (
        <div className={classNames('mr-2 flex-shrink-0')}>
          <img src={iconName} alt={key} width={19} height={19} className="-mt-px block" />
        </div>
      )}
      {label && (
        <div
          className={classNames(
            'mr-2 flex-shrink-0 whitespace-nowrap text-sm text-tertiary-grade5 xs:text-base'
          )}
        >
          {label}
        </div>
      )}

      {url ? (
        <a href={url} className="underline underline-offset-2">
          {value}
        </a>
      ) : (
        <div
          onClick={handleInteraction}
          onKeyUp={handleInteraction}
          className={classNames(
            'group relative flex cursor-pointer gap-x-2 rounded-md bg-secondary-light px-4 py-2'
          )}
        >
          <Transition
            show={isCopied}
            className="absolute bottom-full mb-2 rounded bg-gray-700 px-2 py-1 text-sm text-white"
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            Copied to clipboard!
          </Transition>
          <div
            className="whitespace-nowrap text-sm xs:text-base"
            dangerouslySetInnerHTML={{ __html: value }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-tertiary-grade5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ContactLine;
