import moment from "moment";

export const randomFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const truncString = (string, maxLength, dot = true) => {
  if (string.length > maxLength) {
    return string.slice(0, maxLength) + (dot ? "..." : "");
  }
  return string;
};

export const removeUndefinedAttrs = (obj) => {
  if (obj) {
    for (let key of Object.keys(obj)) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
  return obj;
};

export const removeEmptyStringAttrs = (obj) => {
  if (obj) {
    for (let key of Object.keys(obj)) {
      if (obj[key] === "") {
        delete obj[key];
      }
    }
  }
  return obj;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const clonePlainObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const formatDate = (dateString, relative = false) => {
  const date = moment.utc(dateString);
  return relative ? date.fromNow() : date.format("DD-MM-YYYY");
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

export const isNonEmptyArray = (array) => Array.isArray(array) && array.length;
