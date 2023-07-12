import FormField from './ContactForm/FormField';
import { useState } from 'react';
import { validateCaptcha } from '../utils/validateCaptcha';
import * as EmailValidator from 'email-validator';
import FormResponse from './ContactForm/FormResponse';
import Waiting from './ContactForm/Waiting';
import classNames from 'classnames';

const backendUrl = import.meta.env.VITE_CFORM_BACKEND_URL;

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  msg: '',
};

const emptyErrorValues = { ...emptyValues };

type FormValues = typeof emptyValues & {
  'g-recaptcha-response'?: string;
};

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
      errors.name = 'Please fill in - I need to know your name.';
    }
    if (!values.email) {
      errors.email = 'Please fill in - I need a way to contact you.';
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = 'Sorry, but e-mail is not in valid format';
    }
    if (!values.msg) {
      errors.msg = 'Please write at least a short note - so that we know what to discuss.';
    }
    setErrors(errors);
    return Object.values(errors).every((x) => !x);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (validateForm()) {
      setIsSubmitting(true);
      const valuesToSend = { ...values };
      try {
        const captchaResult = await validateCaptcha();
        if (!captchaResult) {
          setResponse('Error sending message: Invalid captcha');
          return;
        }
        valuesToSend['g-recaptcha-response'] = captchaResult;
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(valuesToSend).toString(),
        });
        const data = await response.json();
        if (data.success) {
          setResponse(true);
          setIsSubmitting(false);
        } else {
          console.error(data);
          setResponse('Error sending message: ' + data.error);
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        setResponse('Error sending message: ' + err);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="lg:max-w-lg">
      <h3>Leave a message</h3>
      {response === true && (
        <FormResponse heading="Message sent successfully!">
          <p>
            Let me get back to you as soon as possible.
            <br />I usually respond within two business days.
          </p>
          <p>
            <strong>Regards, Jan</strong>
          </p>
        </FormResponse>
      )}
      {response !== true && response && (
        <FormResponse heading="Oops - message was not sent" isError={true}>
          <p>
            Please try again later or contact me directly at &nbsp;
            <a className="underline" href="mailto:jan@invenus.dev">
              jan@invenus.dev
            </a>
          </p>
          <p>The issue was reported as follows...</p>
          <p>{response}</p>
        </FormResponse>
      )}
      {isSubmitting && <Waiting text="Processing..." />}
      {response === false && (
        <form
          noValidate={true}
          onSubmit={onSubmitHandler}
          className={classNames({ blur: isSubmitting })}
        >
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
          <div className="flex flex-col items-center space-y-6 xs:flex-row xs:space-x-6 xs:space-y-0">
            <button disabled={isSubmitting} className="btn btn-submit" type="submit">
              Submit
            </button>
            <p className="small">
              Your personal details are collected only for the purpose of contacting you back and
              are not shared with any 3<sup>rd</sup> party outside of invenus except for{' '}
              <a
                target="_blank"
                className="underline"
                href="https://www.google.com/recaptcha/about/"
                rel="noreferrer"
              >
                ReCaptcha SPAM protection
              </a>
              . To review data invenus collected or request data deletion, please{' '}
              <a href="mailto:jan@invenus.dev" className="underline">
                contact me
              </a>
              .
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
