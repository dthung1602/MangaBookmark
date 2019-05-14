const URLRegex = /^https?:\/\/hocvientruyentranh\.net\/truyen\/[0-9]+\/.*$/;

const executeJS = false;

function parseChapters($) {
    let rows = $('.table-hover tr');

    let chapters = [];
    for (let i = 1; i < rows.length; i++) {
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
        isCompleted: $('.__info p')[4].children[1].data.trim() === 'Đã hoàn thành'
    };
}

module.exports = {
    URLRegex,
    executeJS,
    parseManga,
    parseChapters
};