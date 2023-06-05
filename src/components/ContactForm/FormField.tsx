type Props = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string | undefined;
};

const FormField = ({ label, name, type, value, onChange, error }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="border-2 border-gray-700"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="border-2 border-gray-700"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormField;
