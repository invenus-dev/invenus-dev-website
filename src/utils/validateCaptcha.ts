const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const validateCaptcha = (): Promise<string> => {
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: 'submit' }).then((token) => {
        return resolve(token);
      });
    });
  });
};
