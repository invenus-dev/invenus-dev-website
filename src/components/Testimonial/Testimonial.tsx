import { TestimonialEntry } from '../../Testimonials';

type Props = {
  testimonial: TestimonialEntry;
};
const Testimonial = ({ testimonial }: Props) => {
  const { client, name, role, body } = testimonial;
  return (
    <div className="mb-4 flex flex-col justify-evenly gap-4 bg-gray-100 px-8 py-6 md:mb-0">
      <div className="italic">{body}</div>
      <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1">
        <span className="inline-block bg-secondary px-2 py-1">
          <strong>{name}</strong>, {role}
        </span>
        <span className="inline-block bg-primary  px-2 py-1 text-white">{client}</span>
      </div>
    </div>
  );
};

export default Testimonial;
