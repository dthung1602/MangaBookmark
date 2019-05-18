const rq = require('request-promise');
const cheerio = require('cheerio');

const URLRegex = /^https?:\/\/www\.nettruyen\.com\/truyen-tranh\/.+$/;

async function loadData(dataSource) {
    return cheerio.load(await rq(dataSource));
}

function normalizeDataSource(dataSource) {
    return (typeof dataSource === 'string' && dataSource.trim().startsWith('http'))
        ? loadData(dataSource)
        : dataSource
}

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('nav .chapter a');

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
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.detail-info img')[0].attribs.src,
        isCompleted: $('.status p:last-child').text() === "Hoàn thành",
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};