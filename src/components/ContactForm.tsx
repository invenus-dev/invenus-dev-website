import FormField from './ContactForm/FormField';
import { useState } from 'react';

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const backendUrl = import.meta.env.VITE_CFORM_BACKEND_URL;

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  msg: '',
};

const emptyErrorValues = { ...emptyValues };

type FormValues = typeof emptyValues;

const ContactForm = () => {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormValues>(emptyErrorValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<boolean | string>(false);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    const errors: FormValues = { ...emptyErrorValues };
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.phone) {
      errors.phone = 'Phone is required';
    }
    if (!values.msg) {
      errors.msg = 'Message is required';
    }
    setErrors(errors);
    return Object.values(errors).every((x) => !x);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(values).toString(),
        });
        const data = await response.json();
        if (data.success) {
          setResponse(true);
        } else {
          console.error(data);
          setResponse('Error sending message: ' + data.error);
        }
      } catch (err) {
        console.error(err);
        setResponse('Error sending message: ' + err);
      }
    }
  };

  return (
    <>
      {response === true ? <div className="text-green-500">Message sent successfully!</div> : null}
      {response !== true && response ? <div className="text-red-500">{response}</div> : null}
      {response === false && (
        <form onSubmit={onSubmitHandler}>
          <FormField
            label="Name"
            name="name"
            type="text"
            onChange={updateValue}
            value={values.name}
            error={errors.name}
          />
          <FormField
            label="E-mail"
            name="email"
            type="email"
            onChange={updateValue}
            value={values.email}
            error={errors.email}
          />
          <FormField
            label="Phone"
            name="phone"
            type="text"
            onChange={updateValue}
            value={values.phone}
            error={errors.phone}
          />
          <FormField
            label="Your Message"
            name="msg"
            type="textarea"
            onChange={updateValue}
            value={values.msg}
            error={errors.msg}
          />
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default ContactForm;
