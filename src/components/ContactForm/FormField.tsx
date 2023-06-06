import classNames from 'classnames';

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
    <div className="mb-4">
      <label className="label-style" htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={classNames('input-style', { 'input-error': error })}
          rows={5}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={classNames('input-style', { 'input-error': error })}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default FormField;
