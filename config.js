function getEnv(envName, defaultValue = undefined, converter = (x => x)) {
    let value = process.env[envName];
    if (value === undefined)
        value = defaultValue;
    return converter(value);
}

module.exports = {
    'PORT': getEnv('PORT', 3000, parseInt),
    'DB_URL': getEnv('DB_URL', 'mongodb://localhost/MangaBookmark'),
    'CRAWL_MAX_THREADS': getEnv('CRAWL_MAX_THREADS', 5)
};