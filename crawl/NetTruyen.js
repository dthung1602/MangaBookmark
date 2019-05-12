const URLRegex = /https?:\/\/www\.nettruyen\.com\/truyen-tranh\/.+/;

const executeJS = false;

function parseChapters($) {
    let rows = $('nav .chapter a');

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
        image: $('.detail-info img')[0].attribs.src,
        isCompleted: $('.status p:last-child').text() === "Hoàn thành"
    };
}

module.exports = {
    URLRegex,
    executeJS,
    parseManga,
    parseChapters
};