const rq = require('request-promise');
const cheerio = require('cheerio');

const URLRegex = /^https?:\/\/otakusan\.net\/MangaDetail\/[0-9]+\/.+$/;

async function loadData(dataSource) {
    return cheerio.load(await rq({
        uri: dataSource,
        insecure: true, // to handle .net and .com
        rejectUnauthorized: false // to handle .net and .com
    }));
}

function normalizeDataSource(dataSource) {
    return (typeof dataSource === 'string' && dataSource.trim().startsWith('http'))
        ? loadData(dataSource)
        : dataSource
}

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('table.mdi-table .read-chapter a');

    const chapters = [];
    for (let i = 0; i < rows.length; i++) {
        chapters.push({
            name: rows[i].attribs.title,
            link: 'https://otakusan.net' + rows[i].attribs.href
        });
    }

    return chapters;
}

async function parseManga(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    return {
        name: $('h1').text().trim(),
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.image-container img').attr('src'),
        isCompleted: !$('#page_about .form-group').text().includes('Ongoing'),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    loadData,
    parseManga,
    parseChapters
};