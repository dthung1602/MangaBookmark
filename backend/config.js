function getEnv(envName, defaultValue = undefined, converter = (x) => x) {
  let value = process.env[envName];
  if (value === undefined) {
    value = defaultValue;
  }
  return converter(value);
}

function parseBoolean(value) {
  const normalizedValue = value.toString().toLowerCase().trim();
  if (normalizedValue === "true") {
    return true;
  }
  if (normalizedValue === "false") {
    return false;
  }
  throw new Error("Invalid boolean option value");
}

const NODE_ENV = getEnv("NODE_ENV", "development");
let fallbackDatabaseURL =
  NODE_ENV === "test" ? "mongodb://localhost/TestMangaBookmark" : "mongodb://localhost/MangaBookmark";

module.exports = {
  NODE_ENV,

  PORT: getEnv("PORT", 3000, parseInt),
  DB_URL: getEnv("DB_URL", fallbackDatabaseURL),
  AMQP_URL: getEnv("AMQP_URL", "amqp://localhost"),
  REDIS_URL: getEnv("REDIS_URL", "redis://localhost:6379"),
  CRAWL_CONCURRENCY: getEnv("CRAWL_CONCURRENCY", 8, parseInt),

  PROXY_ENABLED: getEnv("PROXY_ENABLED", false, parseBoolean),
  PROXY_HOST: getEnv("PROXY_HOST", ""),
  PROXY_PORT: getEnv("PROXY_PORT", ""),

  SECRET_KEY: getEnv("SECRET_KEY", "yIjaujJQOuen0MQPE2daXN8oBrPY1USc"),
  COOKIE_MAX_AGE: getEnv("COOKIE_MAX_AGE", 30 * 24 * 60 * 60 * 1000, parseInt),
  PAGE_SIZE: getEnv("PAGE_SIZE", 5, parseInt),

  LOCAL_AUTH_SALT_ROUND: getEnv("LOCAL_AUTH_SALT_ROUND", 10, parseInt),
  LOCAL_AUTH_PASS_ROUND: getEnv("LOCAL_AUTH_PASS_ROUND", 16, parseInt),

  GOOGLE_AUTH_ID: getEnv("GOOGLE_AUTH_ID", 111),
  GOOGLE_AUTH_PASSWORD: getEnv("GOOGLE_AUTH_PASSWORD", 111),

  FACEBOOK_AUTH_ID: getEnv("FACEBOOK_AUTH_ID", 222),
  FACEBOOK_AUTH_PASSWORD: getEnv("FACEBOOK_AUTH_PASSWORD", 222),

  REACT_APP_VAPID_PUBLIC_KEY: getEnv("REACT_APP_VAPID_PUBLIC_KEY"),
  REACT_APP_VAPID_PRIVATE_KEY: getEnv("REACT_APP_VAPID_PRIVATE_KEY"),
  WEB_PUSH_CONTACT: getEnv("WEB_PUSH_CONTACT"),
};
