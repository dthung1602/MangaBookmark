function getEnv(envName, defaultValue = undefined, converter = (x => x)) {
    let value = process.env[envName];
    if (value === undefined)
        value = defaultValue;
    return converter(value);
}

module.exports = {
    'NODE_ENV': getEnv('NODE_ENV', 'development'),

    'PORT': getEnv('PORT', 3000, parseInt),
    'DB_URL': getEnv('DB_URL', 'mongodb://localhost/MangaBookmark'),
    'CRAWL_MAX_THREADS': getEnv('CRAWL_MAX_THREADS', 5, parseInt),

    'SECRET_KEY': getEnv('SECRET_KEY', 'yIjaujJQOuen0MQPE2daXN8oBrPY1USc'),
    'COOKIE_MAX_AGE': getEnv('COOKIE_MAX_AGE', 30 * 24 * 60 * 60 * 1000, parseInt),

    'LOCAL_AUTH_SALT_ROUND': getEnv('LOCAL_AUTH_SALT_ROUND', 10, parseInt),
    'LOCAL_AUTH_PASS_ROUND': getEnv('LOCAL_AUTH_PASS_ROUND', 16, parseInt),

    'GOOGLE_AUTH_ID': getEnv('GOOGLE_AUTH_ID'),
    'GOOGLE_AUTH_PASSWORD': getEnv('GOOGLE_AUTH_PASSWORD'),
    
    'FACEBOOK_AUTH_ID': getEnv('FACEBOOK_AUTH_ID'),
    'FACEBOOK_AUTH_PASSWORD': getEnv('FACEBOOK_AUTH_PASSWORD'),
};