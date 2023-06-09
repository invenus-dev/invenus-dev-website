import ContactLine from './ContactDetails/ContactLine';

const LABELS = {
  phone: 'Phone',
  business: 'Address',
  vat: 'VAT ID',
  'bank-eu-iban': 'IBAN',
  'bank-eu-swift': 'SWIFT',
  'bank-cz': 'Account No',
};

type Props = {
  data: Record<keyof typeof LABELS, string>;
};

const ContactDetails = ({ data }: Props) => {
  return (
    <div className="">
      <h4>Business details</h4>
      <div className="mb-10 mt-6">
        <ContactLine label={LABELS.vat} value={data.vat} />
        <ContactLine label={LABELS.business} value={data.business} />
      </div>
      <h4>Bank accounts</h4>
      <h5>1. EUR / USD / GBP / CZK payments:</h5>
      <div className="mb-8">
        <ContactLine label={LABELS['bank-eu-iban']} value={data['bank-eu-iban']} />
        <ContactLine label={LABELS['bank-eu-swift']} value={data['bank-eu-swift']} />
      </div>
      <h5>2. CZK payments - Czech accounts only:</h5>
      <ContactLine label={LABELS['bank-cz']} value={data['bank-cz']} />
    </div>
  );
};

export default ContactDetails;
