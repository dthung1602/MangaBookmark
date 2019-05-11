const express = require('express');
const router = express.Router();

const Manga = require('../models/Manga');
require('../models/Chapter');

const {connectToDB} = require('./utils');

router.get('/', async function (req, res, next) {
    connectToDB(next);

    const mangas = await Manga
        .find({following: 'following'})
        .select('-__v')
        .populate('chapters', '-__v');

    res.json(mangas);
});

module.exports = router;

