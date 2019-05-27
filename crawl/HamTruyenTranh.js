const rq = require('request-promise');
const cheerio = require('cheerio');

const URLRegex = /^http:\/\/www\.hamtruyentranh\.net\/truyen\/.+$/;

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

    const rows = $('.total-chapter .content a');

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
        name: $('.title-manga').text(),
        link: 'http://www.hamtruyentranh.net/' + $('.path-cond a:last-child').attr('href'),
        image: 'http://www.hamtruyentranh.net/' + $('.cover-detail img').attr('src'),
        isCompleted: $('.description-update').text().includes('Kết thúc'),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};