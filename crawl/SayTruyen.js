const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/saytruyen\.com\/truyen\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('.wp-manga-chapter a');

    const chapters = [];
    for (let i = 0; i < rows.length; i++) {
        chapters.push({
            name: rows[i].children[0].data,
            link: rows[i].attribs.href
        });
    }

    return chapters;
}

async function parseManga(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    return {
        name: $('.post-title h3')[0].children[2].data,
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.summary_image img').attr('data-src'),
        isCompleted: false, // not available
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};