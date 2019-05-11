const express = require('express');
const router = express.Router();

const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');
const mongoose = require('mongoose');

const {connectToDB} = require('./utils');

router.get('/', async function (req, res, next) {
    connectToDB(next);

    const mangas = await Manga
        .find({following: 'following'})
        .select('-__v')
        .populate('chapters', '-__v');

    res.json(mangas);
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

    await Manga
        .findByIdAndUpdate(req.params.mangaID, updatedValue)
        .select('-__v');

    res.send('');
});


router.post('/delete/:mangaID', async function (req, res, next) {
    connectToDB(next);

    const manga = await Manga.findByIdAndDelete(req.params.mangaID);
    await Chapter.deleteMany({_id: {$in: manga.chapters.map(ch => ch._id)}});

    res.send('');
});

module.exports = router;

