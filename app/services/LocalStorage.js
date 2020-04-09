export const getItem = function(key, defaultValue) {
  const value = window.localStorage.getItem(key);

  return value == null ? defaultValue : value;
};

export const setItem = function(key, value) {
  window.localStorage.setItem(key, value);
};

export const removeItem = function(key) {
  window.localStorage.removeItem(key);
};

export default {
  getItem,
  setItem,
  removeItem,
};
