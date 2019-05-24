const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');

const {getParser, createManga} = require('../crawl/runner');
const {Manga, connectToDB} = require('../models');
const {checkMangaPermission, handlerWrapper, extractAttributes} = require('./utils');

const validFollowing = ['toread', 'following', 'waiting', 'dropped', 'finished'];

router.get('/',
    check('following').exists().isIn(validFollowing),

    handlerWrapper(async (req, res) => {
        const mangas = await Manga.find({user: req.user.id, following: req.query.following});
        res.json(mangas);
    })
);

router.get('/info',
    check('link').exists()
        .custom(async (link, {req}) => {
            const parser = getParser(link);
            if (!parser)
                throw new Error('Unsupported manga source');
            req.parser = parser;
        }),

    handlerWrapper(async (req, res) => {
        try {
            const manga = await req.parser.parseManga(req.query.link);
            res.json(manga);
        } catch (e) {
            res.status(400).json({link: 'Cannot parse manga'});
        }
    })
);


router.get('/search',
    check('term').exists().trim(),

    handlerWrapper(async (req, res) => {
        const mangas = await Manga.find({
            user: req.user.id,
            $text: {$search: req.query.term}
        });
        res.json(mangas);
    })
);


router.post('/add',
    check('link').exists()
        .custom(async (link, {req}) => {
            if (!getParser(link))
                throw new Error('Unsupported manga source');
            connectToDB();
            const manga = await Manga.findOne({user: req.user.id, link: link});
            if (manga)
                throw new Error('Duplicate manga')
        }),
    check('chapters').exists().isArray(),
    check('note').optional().trim(),
    check('isCompleted').optional().isBoolean(),
    check('following').optional().isIn(validFollowing),

    handlerWrapper(async (req, res) => {
        const userID = req.user.id;
        const {link, chapters, note, following, isCompleted} = req.body;

        const readChapters = chapters.filter(ch => ch.isRead).map(ch => ch.link);

        try {
            await createManga(link, userID, isCompleted, following, readChapters, note);
            res.json({})
        } catch (e) {
            res.status(400).json({link: 'Cannot parse manga'});
        }
    })
);

router.post('/edit',
    check('following').optional().isIn(validFollowing),
    check('note').optional().trim(),
    check('isCompeted').optional().isBoolean(),
    checkMangaPermission,

    handlerWrapper(async (req, res) => {
        const updateValues = extractAttributes(req.body, ['following', 'note', 'isCompleted']);
        await Manga.findByIdAndUpdate(req.manga.id, updateValues);
        res.json({})
    })
);

router.post('/delete',
    checkMangaPermission,

    handlerWrapper(async (req, res) => {
        await Manga.findByIdAndDelete(req.manga.id);
        res.json({})
    })
);

module.exports = router;

