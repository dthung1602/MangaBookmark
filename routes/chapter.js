const express = require('express');
const router = express.Router();
const {checkPermission} = require('./utils');

router.post('/:action', checkPermission, async function (req, res) {
    const chapterLinks = req.body.chapters;
    const action = req.params.action;

    const {manga} = req;

    let isRead;
    if (action === 'read')
        isRead = true;
    else if (action === 'unread')
        isRead = false;
    else {
        res.status(400).send('Invalid action');
        return;
    }

    for (let i = 0; i < chapterLinks.length; i++) {
        const pos = manga.chapters.findIndex(chap => chap.link === chapterLinks[i]);
        if (pos > -1)
            manga.chapters[pos].isRead = isRead;
        else {
            res.status(400).send('Invalid chapter links');
            return;
        }
    }

    await manga.save();

    res.send('')
});

module.exports = router;

