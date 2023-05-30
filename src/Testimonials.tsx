import useSWR from 'swr';
import Testimonial from 'components/Testimonial/Testimonial';

export type TestimonialEntry = {
  id: string;
  client: string;
  name: string;
  role: string;
  body: string;
};

type Props = {
  testimonialsFile: string;
};
const Testimonials = ({ testimonialsFile }: Props) => {
  const { data, error, isLoading } = useSWR<TestimonialEntry[]>(testimonialsFile);

  return (
    <div className="my-5 px-6">
      {isLoading && <div className="text-center text-gray-600">Loading...</div>}
      {error && (
        <div className="text-center text-red-400">
          Sorry, there was an issue loading testimonials.
        </div>
      )}
      {data && (
        <div className="md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {data.map((testimonial) => (
            <Testimonial testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
