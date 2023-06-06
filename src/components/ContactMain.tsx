import ContactLine from './ContactDetails/ContactLine';

const LABELS = {
  phone: 'Phone',
  email: 'E-mail',
  name: 'Name',
};

type Props = {
  data: Record<keyof typeof LABELS, string>;
};

const ContactMain = ({ data }: Props) => {
  return (
    <div className="mb-10 bg-secondary-light px-6 py-8">
      <div className="flex justify-center space-x-10">
        <div>
          <p>
            Get in touch with <strong>Jan Malý</strong> directly via:
          </p>
          <div className="mt-4 flex space-x-8">
            <ContactLine label={LABELS.email} value={data.email} isYellow={true} />
            <ContactLine label={LABELS.phone} value={data.phone} isYellow={true} />
          </div>
        </div>
        <div className="">
          <img
            src="/src/assets/jan-foto.jpg"
            alt="Jan"
            className="-mb-12 -mt-12 h-auto max-w-[12rem] rounded-full border-4 border-secondary-light"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
