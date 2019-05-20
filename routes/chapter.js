const express = require('express');
const router = express.Router();

const {connectToDB, Chapter} = require('../models');

router.post('/read', async function (req, res, next) {
    connectToDB(next);
    await Chapter.updateMany({_id: {$in: req.body.chapters}}, {isRead: true});
    res.send('')
});

router.post('/unread', async function (req, res, next) {
    connectToDB(next);
    await Chapter.updateMany({_id: {$in: req.body.chapters}}, {isRead: false});
    res.send('')
});

module.exports = router;

