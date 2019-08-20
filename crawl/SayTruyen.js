const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/saytruyen\.com\/truyen\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('.wp-manga-chapter > a');

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
        name: $('.breadcrumb li:last-child a').text().trim(),
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.summary_image img').attr('src'),
        isCompleted: false, // not available
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};