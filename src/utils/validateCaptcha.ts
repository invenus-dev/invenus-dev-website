const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const validateCaptcha = (): Promise<string> => {
  return new Promise((resolve) => {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.execute(siteKey, { action: 'FormSubmit' }).then((token) => {
        return resolve(token);
      });
    });
  });
};
