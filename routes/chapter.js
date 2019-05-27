const express = require('express');
const router = express.Router();
const {checkMangaPermission, handlerWrapper} = require('./utils');
const {check} = require('express-validator/check');

router.post('/:action',
    check('action').exists().isIn(['read', 'unread']),
    check('chapters').exists().isArray(),
    checkMangaPermission,

    handlerWrapper(async (req, res) => {
        const chapterLinks = req.body.chapters;
        const action = req.params.action;
        const {manga} = req;
        const isRead = (action === 'read');

        for (let i = 0; i < chapterLinks.length; i++) {
            const pos = manga.chapters.findIndex(chap => chap.link === chapterLinks[i]);
            if (pos > -1)
                manga.chapters[pos].isRead = isRead;
        }

        manga.markModified('chapters');
        await manga.save();
        res.json({});
    })
);

module.exports = router;

