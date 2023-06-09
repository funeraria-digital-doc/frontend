export const saveLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

export const deleteLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
