const cheerio = require('cheerio');

const URLRegex = /https?:\/\/hocvientruyentranh.net\/truyen\/[0-9]+\/.*/;

function parseChapters($) {
    let rows = cheerio('tr', $('.table-hover')[1]);

    let chapters = [];
    for (let i = 0; i < rows.length; i++) {
        const aTag = rows[i].children[1].children[0];
        chapters.push({
            name: aTag.attribs.title,
            link: aTag.attribs.href
        });
    }

    return chapters;
}

function parseManga($) {
    return {
        name: $('h3')[0].children[0].data,
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.__image img')[0].attribs.src,
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};