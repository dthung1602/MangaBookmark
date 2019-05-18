const rp = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const phantom = require('phantom');

const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

const {DB_URL} = require('../config');

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

async function createManga(url, parser) {
    if (parser === undefined)
        parser = getParser(url);
    if (parser === null)
        throw "Unsupported manga source";

    let manga = await parser.parseManga(url);
    manga.chapters = await saveChapters(manga.chapters);
    return new Manga(manga).save()
}

async function updateChapters(manga, parser) {
    if (parser === undefined)
        parser = getParser(manga.link);
    if (parser === null)
        throw "Unsupported manga source";

    let crawledChapters = await parser.parseChapters(url);

    for (let i = 0; i < manga.chapters.length; i++) {
        let pos = crawledChapters.findIndex(ch => ch.link === manga.chapters[i].link);
        if (pos !== -1)
            crawledChapters[pos] = manga.chapters[i];
    }

    for (let i = 0; i < crawledChapters.length; i++)
        if (crawledChapters[i].id === undefined)
            crawledChapters[i] = new Chapter(crawledChapters[i]);

    await Promise.all(crawledChapters.map(ch => ch.save()));

    manga.chapters = crawledChapters;
    return manga.save()
}

function getParser(url) {
    for (let i = 0; i < parsers.length; i++)
        if (url.match(parsers[i].URLRegex))
            return parsers[i];
    return null;
}

async function main() {
    if (process.argv.length < 4)
        throw "Missing args";

    const action = process.argv[2];
    const url = process.argv[3];
    if (action !== 'create' && action !== 'update')
        throw "Invalid action";

    try {
        await mongoose.connect(DB_URL);

        if (action === 'create') {
            await createManga(url)
        } else {
            let manga = await Manga.findOne({link: url}).populate('chapters');
            await updateChapters(manga)
        }

        mongoose.connection.close();

    } catch (e) {
        console.error(e);
        mongoose.connection.close();
        process.exit(1);
    }
}

if (require.main === module)
    main();

module.exports = {createManga, updateChapters, getParser};