import { TestimonialEntry } from '../Testimonials';
import StarIcon from '../../assets/icons/star.svg';

type Props = {
  testimonial: TestimonialEntry;
};
const Testimonial = ({ testimonial }: Props) => {
  const { client, name, role, body, url, photo, logo, stars } = testimonial;
  return (
    <div className="mb-4 flex flex-col justify-between gap-4 pb-8 md:mb-0">
      <div className="xl:mb-6">
        <div className="space-x-0.6 mb-6 flex">
          {Array.from({ length: stars }, () => 1).map((_, i) => (
            <img
              key={i}
              alt="star"
              src={StarIcon}
              style={{ width: '1.1111rem', height: '1.04939rem' }}
            />
          ))}
        </div>
        {body}
      </div>
      <div className="flex flex-row-reverse items-center justify-start gap-8 xl:flex-col xl:items-start xl:gap-0 xl:space-x-0">
        <img
          src={`/testimonials/${photo}.jpg`}
          width="56"
          height="56"
          alt="client"
          className="rounded-full xl:mb-2"
        />
        <p className="text-sm leading-5">
          <strong>{name}</strong>
          <br />
          {role}
          <br />
          {url ? (
            <a href={url} className="underline" target="_blank" rel="noopener noreferrer">
              {client}
            </a>
          ) : (
            <>{client}</>
          )}
          <img
            src={`/testimonials/${logo}.png`}
            alt="client"
            className="mt-3 hidden rounded-full xl:block"
          />
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
