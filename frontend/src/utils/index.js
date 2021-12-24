import moment from "moment";
import { ROUTE_MANGA_DETAIL } from "./constants";

/**
 * Ref: https://stackoverflow.com/a/1997811/7342188
 */
export const addDebugObjectId = () => {
  if (typeof Object.id == "undefined") {
    let id = 0;

    Object.id = function (o) {
      if (o === null || o === undefined) {
        return o;
      }

      if (typeof o.__uniqueid == "undefined") {
        Object.defineProperty(o, "__uniqueid", {
          value: ++id,
          enumerable: false,
          writable: false,
        });
      }

      return o.__uniqueid;
    };
  }

  console.log("Static method Object.id added for debugging");
};

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

export const equalOrIn = (element, target) => {
  if (Array.isArray(target)) {
    return target.includes(element);
  }
  return element === target;
};

export const doNothing = () => {};

export const buildMangaDetailPath = (manga) => {
  return ROUTE_MANGA_DETAIL + "?id=" + manga._id;
};
