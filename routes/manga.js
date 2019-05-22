const express = require('express');
const router = express.Router();

const {getParser, createManga} = require('../crawl/runner');
const {connectToDB, Manga} = require('../models');
const {checkPermission} = require('./utils');

router.get('/', function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {following} = req.query;

    const validFollowingValues = ['toread', 'following', 'waiting', 'dropped', 'finished'];
    if (validFollowingValues.indexOf(following) === -1) {
        res.status(400).send("Invalid following type");
        return
    }

    Manga.find({user: userID, following: following})
        .then(mangas => res.json(mangas))
        .catch(next);
});

router.get('/info', function (req, res, next) {
    const {link} = req.query;
    const parser = getParser(link);

    if (parser === null) {
        res.status(400).send('Unsupported manga source');
        return
    }

    parser.parseManga(link)
        .then(manga => res.json(manga))
        .catch(next);
});


router.get('/search', function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {term} = req.query;

    if (!term) {
        res.status(400).send('Missing search term');
        return
    }

    Manga.find({user: userID, $text: {$search: term}})
        .then(mangas => res.json(mangas))
        .catch(next);
});


router.post('/add', function (req, res, next) {
    connectToDB(next);
    const userID = req.user.id;
    const {link, chapters, note, following, isCompleted} = req.body;

    const readChapters = chapters.filter(ch => ch.isRead).map(ch => ch.link);
    createManga(link, userID, isCompleted, following, readChapters, note)
        .then(() => res.send())
        .catch((err) => {
            if (err.name === 'ValidationError')
                res.status(400).send(err.toString());
            else
                next(err);
        });
});

router.post('/edit', checkPermission, function (req, res, next) {
    const fields = ['isCompleted', 'following', 'note'];
    const updatedValue = {};
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (req.body[field] !== undefined)
            updatedValue[field] = req.body[field]
    }

    Manga.findByIdAndUpdate(req.manga.id, updatedValue)
        .then(() => res.send())
        .catch((err) => {
            if (err.name === 'ValidationError')
                res.status(400).send(err.toString());
            else
                next(err);
        });
});

router.post('/delete', checkPermission, function (req, res, next) {
    Manga.findByIdAndDelete(req.manga.id)
        .then(() => res.send())
        .catch(next);
});

module.exports = router;

