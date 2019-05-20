const passport = require('passport');
const express = require('express');
const router = express.Router();

const {User} = require("../models");
const {connectToDB} = require('../models');

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send('');
});

// auth with username and password
router.get('/local', passport.authenticate('local'));

// register new user
router.get('/local/register',
    (req, res) => {
        connectToDB();
        const user = new User({username: req.query.username});
        user.setPassword(req.query.password)
            .then(() => user.save())
            .then((user) => req.login(user, (err) => {
                if (!err)
                    res.send('');
                else
                    res.status(500).send(err.toString());
            }))
            .catch((e) => res.status(500).send(e.toString()))
    }
);

// auth with google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// callback route for google to redirect to
router.get('/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;