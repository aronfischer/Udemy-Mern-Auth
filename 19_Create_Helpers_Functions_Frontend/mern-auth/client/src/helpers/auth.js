const cookie = require("js-cookie");

// Set a cookie
export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

// Get cookie
export const getCookie = (key) => {
  cookie.get(key);
};

// Remove cookie
export const removeCookie = (key) => {
  cookie.remove(key);
};

// Set localStorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get localStorage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Remove localStorage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// Login
export const login = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// Logout
export const logout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

// Returns the user when he is logged in and returns false when he is not
export const isLoggedIn = () => {
  if (getCookie("token")) {
    if (localStorage.getItem("user")) {
      return getLocalStorage("user");
    }
  }
  return false;
};
