const normalizeDataSource = require('./utils').normalizeDataSource;

const URLRegex = /^https?:\/\/mangawww\.club\/manga\/.+$/;

async function parseChapters(dataSource) {
    const $ = await normalizeDataSource(dataSource);

    const rows = $('.chapters a');

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
        name: $('h2')[0].children[0].data,
        link: $('.fb-comments').attr('data-href'),
        image: $('.img-responsive').attr('src'),
        isCompleted: $('.label').text().includes("Complete"),
        chapters: await parseChapters($)
    };
}

module.exports = {
    URLRegex,
    parseManga,
    parseChapters
};