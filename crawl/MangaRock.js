const URLRegex = /https?:\/\/mangarock\.com\/manga\/mrs-serie-[0-9]+$/;

const executeJS = true;

function parseChapters($) {
    let links = $('[data-test="chapter-table"] a');

    let chapters = [];
    for (let i = 0; i < links.length; i++) {
        chapters.push({
            name: links[i].children[0].data,
            link: 'https://mangarock.com' + links[i].attribs.href
        });
    }

    return chapters;
}

function parseManga($) {
    return {
        name: $('h1').text(),
        link: $('meta[property="og:url"]').attr('content'),
        image: $('img')[1].attribs.src,
        isCompleted:  $('._2jVBw span:first-child').text() === 'Completed'
    };
}

module.exports = {
    URLRegex,
    executeJS,
    parseManga,
    parseChapters
};