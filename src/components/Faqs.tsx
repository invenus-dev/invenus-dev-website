import Faq from './Faqs/Faq';
import useSWR from 'swr';

export type FaqsEntry = {
  key: string;
  question: string;
  answer: string;
};

type Props = {
  faqsFile: string;
  onLinkClicked: (link: string) => void;
};
const Faqs = ({ faqsFile, onLinkClicked }: Props) => {
  const { data, error, isLoading } = useSWR<FaqsEntry[]>(faqsFile);
  return (
    <div className="container mx-auto my-5 px-8">
      {isLoading && <div className="text-center text-gray-600">Loading...</div>}
      {error && (
        <div className="text-center text-red-400">Sorry, there was an issue loading Faqs.</div>
      )}
      {data && (
        <div className="">
          {data.map((faq) => (
            <Faq onLinkClicked={onLinkClicked} faq={faq} key={faq.key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Faqs;
