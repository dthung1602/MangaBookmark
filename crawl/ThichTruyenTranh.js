const rq = require('request-promise');
const cheerio = require('cheerio');

const URLRegex = /^https?:\/\/thichtruyentranh\.com\/.+\/[0-9]+\.html$/;

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

    const rows = $('#listChapterBlock a');

    const chapters = [];
    for (let i = 1; i < rows.length; i++) {
        chapters.push({
            name: rows[i].children[0].data,
            link: 'https://thichtruyentranh.com' + rows[i].attribs.href
        });
    }

    return chapters.reverse();
}

async function parseManga(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    return {
        name: $('h1')[1].children[0].data,
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.divthum2 img').attr('src'),
        isCompleted: $('.ullist_item').text().includes('FULL'),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};