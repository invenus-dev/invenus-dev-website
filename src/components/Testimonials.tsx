import useSWR from 'swr';
import Testimonial from './Testimonial/Testimonial';

export type TestimonialEntry = {
  id: string;
  stars: number;
  client: string;
  name: string;
  role: string;
  body: string;
  photo: string;
  logo: string;
  url?: string;
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
        <div className="xl:grid xl:grid-cols-3 xl:gap-6">
          {data.map((testimonial) => (
            <Testimonial testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
