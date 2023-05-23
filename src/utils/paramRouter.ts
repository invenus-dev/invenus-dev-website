const getParameters = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};
  for (const param of searchParams) {
    params[param[0]] = param[1];
  }
  return params;
};

export const getParameterValue = (param: string, defaultValue: string | null) => {
  const params = getParameters();
  if (params[param]) {
    return params[param];
  } else {
    return defaultValue;
  }
};

export const setUrlParameterValue = (param: string, value: string | null) => {
  const url = new URL(window.location.href);
  if (value === null) {
    url.searchParams.delete(param);
  } else {
    url.searchParams.set(param, value);
  }

  window.history.pushState({}, document.title, url.toString());
};
