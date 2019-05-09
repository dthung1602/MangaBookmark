const rp = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const phantom = require('phantom');

const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

const parsers = [
    require('./HocVienTruyenTranh'),
    require('./MangaRock'),
    require('./Mangakakalot'),
    require('./NetTruyen')
];

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function saveChapters(chapters) {
    return Promise.all(chapters.map(chapter => new Chapter(chapter).save()));
}

async function get$(url, executeJS) {
    let content;

    if (executeJS) {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.open(url);

        content = await page.property('content');
        await instance.exit();
    } else {
        content = await rp(url);
    }

    return cheerio.load(content);
}

async function createManga(url, parser) {
    let $ = await get$(url, parser.executeJS);

    let manga = new Manga(parser.parseManga($));
    let chapters = parser.parseChapters($);

    manga.chapters = await saveChapters(chapters);
    return manga.save()
}

async function updateChapters(manga, parser) {
    let $ = await get$(manga.link, parser.executeJS);

    let crawledChapters = parser.parseChapters($);

    for (let i = 0; i < manga.chapters.length; i++) {
        let pos = crawledChapters.findIndex(ch => ch.link === manga.chapters[i].link);
        if (pos !== -1)
            crawledChapters[pos] = manga.chapters[i];
    }

    for (let i = 0; i < crawledChapters.length; i++)
        if (crawledChapters[i].id === undefined)
            crawledChapters[i] = new Chapter(crawledChapters[i]);

    await Promise.all(crawledChapters.map(ch => new Chapter(ch).save()));

    manga.chapters = crawledChapters;
    return manga.save()
}

async function main() {
    if (process.argv.length < 4)
        throw "Missing args";

    const action = process.argv[2];
    const url = process.argv[3];
    if (action !== 'create' && action !== 'update')
        throw "Invalid action";

    let parser = null;
    for (let i = 0; i < parsers.length; i++) {
        if (url.match(parsers[i].URLRegex)) {
            parser = parsers[i];
            break;
        }
    }

    if (parser === null)
        throw "Not supported manga source";

    try {
        await mongoose.connect('mongodb://localhost/MangaBookmark');

        if (action === 'create') {
            await createManga(url, parser)
        } else {
            let manga = await Manga.findOne({link: url}).populate('chapters');
            await updateChapters(manga, parser)
        }

        mongoose.connection.close();

    } catch (e) {
        console.error(e);
        mongoose.connection.close();
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
}

if (require.main === module)
    main();

module.exports = {createManga, updateChapters};