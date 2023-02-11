import { config } from "dotenv";
import { parseBoolean } from "./services/utils/index.js";
({ config }).config();
function getEnv(envName, defaultValue = undefined, converter = (x) => x) {
  let value = process.env[envName];
  if (value === undefined) {
    value = defaultValue;
  }
  return converter(value);
}
const NODE_ENV = getEnv("NODE_ENV", "development");
let fallbackDatabaseURL =
  NODE_ENV === "test" ? "mongodb://localhost/TestMangaBookmark" : "mongodb://localhost/MangaBookmark";
const HOST_NAME = getEnv("HOST_NAME", NODE_ENV === "development" ? "localhost:3000" : "");
const HTTP_SCHEMA = NODE_ENV === "development" ? "http" : "https";
const BASE_URL = HTTP_SCHEMA + "://" + HOST_NAME;
export const PORT = getEnv("PORT", 3000, parseInt);
export const DB_URL = getEnv("DB_URL", fallbackDatabaseURL);
export const AMQP_URL = getEnv("AMQP_URL", "amqp://localhost");
export const REDIS_URL = getEnv("REDIS_URL", "redis://localhost:6379");
export const CRAWL_CONCURRENCY = getEnv("CRAWL_CONCURRENCY", 4, parseInt);
export const PROXY_ENABLED = getEnv("PROXY_ENABLED", false, parseBoolean);
export const PROXY_HOST = getEnv("PROXY_HOST", "");
export const PROXY_PORT = getEnv("PROXY_PORT", "");
export const SECRET_KEY = getEnv("SECRET_KEY", "yIjaujJQOuen0MQPE2daXN8oBrPY1USc");
export const COOKIE_MAX_AGE = getEnv("COOKIE_MAX_AGE", 30 * 24 * 60 * 60 * 1000, parseInt);
export const PAGE_SIZE = getEnv("PAGE_SIZE", 5, parseInt);
export const LOCAL_AUTH_SALT_ROUND = getEnv("LOCAL_AUTH_SALT_ROUND", 10, parseInt);
export const LOCAL_AUTH_PASS_ROUND = getEnv("LOCAL_AUTH_PASS_ROUND", 16, parseInt);
export const GOOGLE_AUTH_ID = getEnv("GOOGLE_AUTH_ID", 111);
export const GOOGLE_AUTH_PASSWORD = getEnv("GOOGLE_AUTH_PASSWORD", 111);
export const FACEBOOK_AUTH_ID = getEnv("FACEBOOK_AUTH_ID", 222);
export const FACEBOOK_AUTH_PASSWORD = getEnv("FACEBOOK_AUTH_PASSWORD", 222);
export const SERVICE_API_TOKEN = getEnv("SERVICE_API_TOKEN", "yIjaujJQOuen0MQPE2daXN8oBrPY1USc");
export const REACT_APP_VAPID_PUBLIC_KEY = getEnv("REACT_APP_VAPID_PUBLIC_KEY");
export const REACT_APP_VAPID_PRIVATE_KEY = getEnv("REACT_APP_VAPID_PRIVATE_KEY");
export const WEB_PUSH_CONTACT = getEnv("WEB_PUSH_CONTACT");
export { NODE_ENV };
export { HOST_NAME };
export { HTTP_SCHEMA };
export { BASE_URL };
export default {
  NODE_ENV,
  HOST_NAME,
  HTTP_SCHEMA,
  BASE_URL,
  PORT,
  DB_URL,
  AMQP_URL,
  REDIS_URL,
  CRAWL_CONCURRENCY,
  PROXY_ENABLED,
  PROXY_HOST,
  PROXY_PORT,
  SECRET_KEY,
  COOKIE_MAX_AGE,
  PAGE_SIZE,
  LOCAL_AUTH_SALT_ROUND,
  LOCAL_AUTH_PASS_ROUND,
  GOOGLE_AUTH_ID,
  GOOGLE_AUTH_PASSWORD,
  FACEBOOK_AUTH_ID,
  FACEBOOK_AUTH_PASSWORD,
  SERVICE_API_TOKEN,
  REACT_APP_VAPID_PUBLIC_KEY,
  REACT_APP_VAPID_PRIVATE_KEY,
  WEB_PUSH_CONTACT,
};
