const mongoose = require('mongoose');

const Manga = require('../models/Manga');

const {DB_URL} = require('../config');

const parsers = [
    require('./HocVienTruyenTranh'),
    require('./MangaRock'),
    require('./Mangakakalot'),
    require('./NetTruyen'),
    require('./TruyenQQ'),
    require('./MangaWwwClub'),
    require('./Otakusan'),
    require('./TruyenTranh8'),
    require('./TruyenTranhTuan'),
    require('./MangaBat'),
    require('./Mangasim'),
    require('./Mangazuki'),
];

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

async function createManga(url, userID, isCompleted = false, following = 'following',
                           readChapters = [], note = '') {
    const parser = getParser(url);
    if (parser === null)
        throw new Error("Unsupported manga source");

    let manga = await parser.parseManga(url);

    manga.chapters.forEach(chap => chap.isRead = readChapters.indexOf(chap.link) > -1);

    manga.user = userID;
    manga.following = following;
    manga.note = note;
    manga.isCompleted = isCompleted;

    return new Manga(manga).save()
}

async function updateChapters(manga) {
    const parser = getParser(manga.link);
    if (parser === null)
        throw new Error("Unsupported manga source");

    let crawledChapters = await parser.parseChapters(manga.link);

    for (let i = 0; i < manga.chapters.length; i++) {
        let pos = crawledChapters.findIndex(ch => ch.link === manga.chapters[i].link);
        if (pos !== -1)
            crawledChapters[pos] = manga.chapters[i];
    }

    manga.chapters = crawledChapters;
    manga.markModified('chapters');
    return manga.save()
}

function getParser(url) {
    if (!url) return null;
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
            let manga = await Manga.findOne({link: url});
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