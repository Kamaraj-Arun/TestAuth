export const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  const storedValue = sessionStorage.getItem(key);
  //   console.log("check", JSON.parse(storedValue || ""));
  return storedValue ? JSON.parse(storedValue) : null;
};

export const numberInputOnWheelPreventChange = (e: any) => {
  // Prevent the input value change
  e.target.blur();

  // Prevent the page/container scrolling
  e.stopPropagation();

  // Refocus immediately, on the next tick (after the current function is done)
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const clearSpecificSessionStorage = (excludeKeys: any) => {
  // Loop through sessionStorage and clear all keys except the ones in excludeKeys
  Object.keys(sessionStorage).forEach((key) => {
    if (!excludeKeys.includes(key)) {
      sessionStorage.removeItem(key);
    }
  });
};
