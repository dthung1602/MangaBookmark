const mongoose = require('mongoose');

const Manga = require('../models/Manga');

const {DB_URL, CRAWL_MAX_THREADS} = require('../config');

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
    require('./HamTruyenTranh'),
    require('./ThichTruyenTranh'),
    require('./SayTruyen'),
    require('./Truyen1')
];

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function chunkArray(array, chunkSize) {
    const tempArray = [];

    for (let index = 0; index < array.length; index += chunkSize)
        tempArray.push(array.slice(index, index + chunkSize));

    return tempArray;
}

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

    let newChapCount = 0;
    let unreadChapCount = 0;
    crawledChapters.forEach(chap => {
        if (!chap._id)
            newChapCount += 1;
        if (!chap.isRead)
            unreadChapCount += 1;
    });

    if (newChapCount > 0) {
        manga.chapters = crawledChapters;
        manga.markModified('chapters');
        await manga.save();
    }

    manga.newChapCount = newChapCount;
    manga.unreadChapCount = unreadChapCount;
    return manga;
}

async function updateMangas(mangas, verbose = false) {
    if (verbose) {
        console.log(`Start updating ${mangas.length} mangas`);
        console.log(`Using up to ${CRAWL_MAX_THREADS} threads`);
    }

    const chunks = chunkArray(mangas, CRAWL_MAX_THREADS);
    const successMangas = [];

    for (let i = 0; i < chunks.length; i++)
        await Promise.all(chunks[i].map(async manga => {
            try {
                await updateChapters(manga);
                successMangas.push(manga);
                if (verbose)
                    console.log(`    Update: '${manga.name}'`);
            } catch (e) {
                console.error(`    Fail to update: '${manga.name}'`);
                if (verbose)
                    console.error(e.toString());
            }
        }));

    return successMangas;
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

module.exports = {createManga, updateMangas, getParser};