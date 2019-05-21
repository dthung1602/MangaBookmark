const express = require('express');
const router = express.Router();

const {getParser, createManga} = require('../crawl/runner');
const {connectToDB, Manga, Chapter} = require('../models');
const {checkPermission} = require('./utils');

router.get('/', async function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {following} = req.query;

    if (following === undefined) {
        res.status(400).send("Missing following type");
        return
    }

    const mangas = await Manga
        .find({
            user: userID,
            following: following
        })
        .select('-__v');

    res.json(mangas);
});

router.get('/info', async function (req, res) {
    const {link} = req.query;
    const parser = getParser(link);

    if (parser === null) {
        res.status(400).send('Unsupported manga source');
        return
    }

    const manga = await parser.parseManga(link);

    res.json(manga);
});


router.get('/search', async function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {term} = req.query;

    if (term === undefined || term === '') {
        res.status(400).send('Missing search term');
        return
    }

    const mangas = await Manga.find({
        user: userID,
        $text: {$search: term,}
    });

    res.json(mangas);
});


router.post('/add', async function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {link, chapters, note, following, isCompleted} = req.body;

    const readChapters = chapters.filter(ch => ch.isRead).map(ch => ch.link);
    const manga = await createManga(link, userID, isCompleted, following, readChapters, note);

    res.json(manga);
});

router.post('/edit', checkPermission, async function (req, res) {
    const fields = ['isCompleted', 'following', 'note'];
    const updatedValue = {};
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (req.body[field] !== undefined)
            updatedValue[field] = req.body[field]
    }

    await Manga.findByIdAndUpdate(req.manga.id, updatedValue);

    res.send('');
});

router.post('/delete', checkPermission, async function (req, res) {
    await Manga.findByIdAndDelete(req.manga.id);
    res.send('');
});

module.exports = router;

