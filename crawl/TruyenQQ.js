const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/truyenqq\.com\/truyen-tranh\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('.works-chapter-list a');

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
        image: $('.block01 .left img')[0].attribs.src,
        isCompleted: $('.block01 .txt').text().includes("Hoàn Thành"),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};