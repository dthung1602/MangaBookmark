const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/truyentranhtuan\.com\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('#manga-chapter a');

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
        name: $('h1').text(),
        link: $('link[rel="canonical"]').attr('href'),
        image: $('.manga-cover img')[0].attribs.src,
        isCompleted: $('.misc-infor').text().includes('Hoàn thành'),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};