const rp = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');

const parsers = [
    require('./HocVienTruyenTranh')
];

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function handleError(err) {
    if (err) {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    }
}

function saveChapters(chapters) {
    return Promise.all(chapters.map(chapter => new Promise(
        (resolve, reject) => new Chapter(chapter).save(
            (err, ch) => err ? reject(err) : resolve(ch)
        ))))
        .catch(handleError)
}

function createManga(url, parseManga, parseChapters) {
    return new Promise((resolve, reject) =>
        rp(url)
            .then((html) => {
                let $ = cheerio.load(html);
                let manga = new Manga(parseManga($));
                let chapters = parseChapters($);
                saveChapters(chapters)
                    .then((chaps) => {
                        manga.chapters = chaps.map(ch => ch.id);
                        manga.save((err, m) => {
                            if (err) reject(err);
                            else resolve(m);
                        })
                    })
            })
            .catch((err) => reject(err))
    )
}

function updateChapters(manga, parseChapters) {
    return new Promise((resolve, reject) => {
        rp(manga.link)
            .then((html) => parseChapters(cheerio.load(html)))
            .then((crawledChapters) => {
                for (let i = 0; i < manga.chapters.length; i++) {
                    let pos = crawledChapters.findIndex(ch => ch.link === manga.chapters[i].link);
                    if (pos !== -1)
                        crawledChapters[pos] = manga.chapters[i];
                }
                for (let i = 0; i < crawledChapters.length; i++)
                    if (crawledChapters[i].id === undefined)
                        crawledChapters[i] = new Chapter(crawledChapters[i]);
                Promise.all(crawledChapters.map(ch => new Chapter(ch).save()))
                    .then((result) => {
                        console.log(result);
                        console.log(crawledChapters.map(ch => ch.id));
                        console.log(crawledChapters.map(ch => ch._id));
                        manga.chapters = crawledChapters;
                        return manga.save()
                    })
                    .then(resolve)
                    .catch(reject)
            })
            .catch((err) => reject(err))
    })
}

if (require.main === module) {
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

    mongoose
        .connect('mongodb://localhost/MangaBookmark')
        .then(() => {
            if (action === 'create') {
                createManga(url, parser.parseManga, parser.parseChapters)
                    .then(() => mongoose.connection.close())
                    .catch(handleError)
            } else {
                Manga.findOne({link: url})
                    .populate('chapters')
                    .exec((err, manga) => {
                        handleError(err);
                        updateChapters(manga, parser.parseChapters)
                            .then(() => mongoose.connection.close())
                            .catch(handleError)
                    })
            }
        })
        .catch(handleError)
}

module.exports = {createManga, updateChapters};