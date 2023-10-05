import ContactLine from './ContactDetails/ContactLine';

export type ContactObject = {
  key: string;
  value: string;
  url?: string;
  label?: string;
};

type Props = {
  data: ContactObject[];
};

const ContactDetails = ({ data }: Props) => {
  return (
    <div className="">
      <div className="pr-8">
        {data.map((item, index) =>
          item.key === 'header' ? (
            <h4 key={index}>{item.value}</h4>
          ) : item.key === 'subheader' ? (
            <h5 key={index}>{item.value}</h5>
          ) : (
            <ContactLine key={index} item={item} />
          )
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
