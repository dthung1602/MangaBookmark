import lodash from "lodash";
import { flattenObject } from "./utils/index.js";

const { isString } = lodash;

const TOTAL_MANGA_FOUND = "Total manga found";
const TOTAL_MANGA_PUSHED_TO_QUEUE = "Total manga pushed to queue";

const UPDATE_MANGA_SUCCEEDED = "Update manga succeeded";
const UPDATE_MANGA_FAILED = "Update manga failed";

const SEARCH_MANGA_FAILED = "Search manga failed";

const WEBPUSH_NO_UPDATE = "No updates for user";
const WEBPUSH_FINISHED = "Webpush finished";
const WEBPUSH_FAILED = "Webpush failed";

const INTERNAL_SERVER_ERROR = "Internal server error";
const CONNECTION_ERROR = "Connection error";

function formatMessage(component, message, args = {}) {
  let logValue = `timestamp=${new Date().toISOString()} component=${component} message="${message}"`;
  for (let [key, value] of Object.entries(flattenObject(args))) {
    if (isString(value)) {
      logValue += ` ${key}="${value}"`;
    } else {
      logValue += ` ${key}=${value}`;
    }
  }
  return logValue;
}

function getLogger(component) {
  return {
    info: (message, args) => console.info(formatMessage(component, message, args)),
    warn: (message, args) => console.warn(formatMessage(component, message, args)),
    log: (message, args) => console.log(formatMessage(component, message, args)),
    error: (message, args) => console.error(formatMessage(component, message, args)),
  };
}

export {
  getLogger,
  TOTAL_MANGA_FOUND,
  TOTAL_MANGA_PUSHED_TO_QUEUE,
  UPDATE_MANGA_SUCCEEDED,
  UPDATE_MANGA_FAILED,
  SEARCH_MANGA_FAILED,
  WEBPUSH_FINISHED,
  WEBPUSH_FAILED,
  WEBPUSH_NO_UPDATE,
  INTERNAL_SERVER_ERROR,
  CONNECTION_ERROR,
};
export default {
  getLogger,
  TOTAL_MANGA_FOUND,
  TOTAL_MANGA_PUSHED_TO_QUEUE,
  UPDATE_MANGA_SUCCEEDED,
  UPDATE_MANGA_FAILED,
  SEARCH_MANGA_FAILED,
  WEBPUSH_FINISHED,
  WEBPUSH_FAILED,
  WEBPUSH_NO_UPDATE,
  INTERNAL_SERVER_ERROR,
  CONNECTION_ERROR,
};
