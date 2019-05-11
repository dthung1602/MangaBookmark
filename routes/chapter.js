const express = require('express');
const router = express.Router();

const Chapter = require('../models/Chapter');

const {connectToDB} = require('./utils');

router.post('/read/:chapID', async function (req, res, next) {
    connectToDB(next);
    await Chapter.findByIdAndUpdate(req.params.chapID, {isRead: true});
    res.send('')
});

router.post('/unread/:chapID', async function (req, res, next) {
    connectToDB(next);
    await Chapter.findByIdAndUpdate(req.params.chapID, {isRead: false});
    res.send('')
});

module.exports = router;

