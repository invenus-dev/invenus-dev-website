import ContactLine from './ContactDetails/ContactLine';
import JanFoto from '../assets/jan-foto.jpg';

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
      <div className="flex flex-col-reverse items-center justify-center sm:flex-row sm:space-x-16 lg:space-x-10">
        <div>
          <p>
            Get in touch with <strong>Jan Malý</strong> directly via:
          </p>
          <div className="mt-4 flex flex-col justify-start lg:flex-row lg:space-x-8">
            <ContactLine label={LABELS.email} value={data.email} isYellow={true} />
            <ContactLine label={LABELS.phone} value={data.phone} isYellow={true} />
          </div>
        </div>
        <div className="mb-8 sm:mb-0">
          <img
            src={JanFoto}
            alt="Jan"
            className="h-auto max-w-[12rem] border-4 border-secondary-light lg:-mb-12 lg:-mt-12 lg:rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
