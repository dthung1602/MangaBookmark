const express = require('express');
const router = express.Router();

const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');
const {get$, getParser, createManga, updateChapters} = require('../crawl/runner');

const {connectToDB} = require('./utils');

router.get('/', async function (req, res, next) {
    connectToDB(next);

    const following = req.query.following;
    if (following === undefined) {
        res.status(400).send("Missing following type");
        return
    }

    const mangas = await Manga
        .find({following: following})
        .select('-__v')
        .populate('chapters', '-__v');

    res.json(mangas);
});

router.post('/info', async function (req, res) {
    const link = req.body.link;
    const parser = getParser(link);

    if (parser === null) {
        res.status(400).send('Unsupported manga source');
        return
    }

    const $ = await get$(link, parser.executeJS);
    const chapters = parser.parseChapters($);
    const manga = parser.parseManga($);
    manga.chapterCount = chapters.length;

    res.json(manga);
});

router.post('/add', async function (req, res, next) {
    connectToDB(next);
    const manga = await createManga(req.body.link);
    res.json(manga);
});

router.post('/edit/:mangaID', async function (req, res, next) {
    connectToDB(next);

    const fields = ['isCompleted', 'following', 'note'];
    const updatedValue = {};
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (req.body[field] !== undefined)
            updatedValue[field] = req.body[field]
    }

    await Manga.findByIdAndUpdate(req.params.mangaID, updatedValue);

    res.send('');
});

router.post('/delete/:mangaID', async function (req, res, next) {
    connectToDB(next);

    const manga = await Manga.findByIdAndDelete(req.params.mangaID);
    await Chapter.deleteMany({_id: {$in: manga.chapters.map(ch => ch._id)}});

    res.send('');
});

module.exports = router;

