const express = require('express');
const router = express.Router();

const {User, connectToDB} = require('../models');

router.get('/', async function (req, res, next) {
    connectToDB(next);
    const user = await User.findById(req.user.id).select('_id username');
    res.json(user);
});

module.exports = router;

