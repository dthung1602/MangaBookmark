const URLRegex = /https?:\/\/mangakakalot\.com\/manga\/[a-z]{2}[0-9]+/;

const executeJS = false;

function parseChapters($) {
    let rows = $('.chapter-list a');

    let chapters = [];
    for (let i = 0; i < rows.length; i++) {
        chapters.push({
            name: rows[i].children[0].data,
            link: rows[i].attribs.href
        });
    }

    return chapters;
}

function parseManga($) {
    return {
        name: $('h1').text(),
        link: $('meta[property="og:url"]').attr('content'),
        image: $('.manga-info-pic img')[0].attribs.src,
    };
}

module.exports = {
    URLRegex,
    executeJS,
    parseManga,
    parseChapters
};