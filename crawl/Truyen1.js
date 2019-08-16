const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/truyen1\.net\/TruyenTranh\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('.cellChapter a');

    const chapters = [];
    for (let i = 0; i < rows.length; i++) {
        chapters.push({
            name: rows[i].children[0].data,
            link: 'http://truyen1.net' + rows[i].attribs.href
        });
    }

    return chapters;
}

async function parseManga(dataSource) {
    const $ = await normalizeDataSource(dataSource);
    const aTag = $('.nameChapter a');

    return {
        name: aTag.attr('title'),
        link: 'http://truyen1.net' + aTag.attr('href'),
        image: $('.cImage img').attr('src'),
        isCompleted: $('.info').text().includes("Full Bộ"),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};