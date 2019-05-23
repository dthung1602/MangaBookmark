const express = require('express');
const router = express.Router();

const {User, connectToDB} = require('../models');

router.get('/', function (req, res, next) {
    connectToDB(next);
    User.findById(req.user.id).select('-password')
        .then(user => res.json(user))
        .catch(next);
});

module.exports = router;

