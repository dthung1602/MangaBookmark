function getEnv(envName, defaultValue = undefined, converter = (x => x)) {
    let value = process.env[envName];
    if (value === undefined)
        value = defaultValue;
    return converter(value);
}

module.exports = {
    'PORT': getEnv('PORT', 3000, parseInt),
    'DB_URL': getEnv('DB_URL', 'mongodb://localhost/MangaBookmark'),
    'CRAWL_MAX_THREADS': getEnv('CRAWL_MAX_THREADS', 5),

    'SECRET_KEY': getEnv('SECRET_KEY', 'yIjaujJQOuen0MQPE2daXN8oBrPY1USc'),
    'COOKIE_MAX_AGE': getEnv('COOKIE_MAX_AGE', 7 * 24 * 60 * 60 * 1000, parseInt),

    'GOOGLE_AUTH_ID': getEnv('GOOGLE_AUTH_ID'),
    'GOOGLE_AUTH_PASSWORD': getEnv('GOOGLE_AUTH_PASSWORD'),
};