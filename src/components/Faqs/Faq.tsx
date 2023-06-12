import { FaqsEntry } from '../Faqs';
import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  faq: FaqsEntry;
  onLinkClicked: (link: string) => void;
};

const getTreatedContent = (answer: string): string | string[] => {
  const regex = /(.*)<link to="([a-z#-]+)">(.*?)<\/link>(.*)/;
  const match = answer.match(regex);
  if (match) {
    return [match[1], match[2], match[3], match[4]];
  } else {
    return answer;
  }
};

const Faq = ({ faq, onLinkClicked }: Props) => {
  const answer = getTreatedContent(faq.answer);
  const [isOpen, setIsOpen] = useState(false);
  const handleQuestionClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6 border-collapse border-b border-b-gray-200">
      <a
        href={`#faq-${faq.key}`}
        className="flex items-center space-x-4 pb-4 text-xl font-semibold"
        onClick={handleQuestionClicked}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4 flex-shrink-0 text-primary-light"
        >
          {!isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          )}
        </svg>
        <span>{faq.question}</span>
      </a>
      <div
        className={classNames('px-4 pb-6 pt-2', {
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        {Array.isArray(answer) ? (
          <>
            {answer[0]}
            <a
              href={answer[1]}
              onClick={(e) => {
                e.preventDefault();
                onLinkClicked(answer[1]);
              }}
              className="font-semibold text-primary-light underline"
            >
              {answer[2]}
            </a>
            {answer[3]}
          </>
        ) : (
          <>{answer}</>
        )}
      </div>
    </div>
  );
};

export default Faq;
