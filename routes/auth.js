const passport = require('passport');
const express = require('express');
const router = express.Router();

const {User} = require("../models");
const {connectToDB} = require('../models');
const {redirectHome} = require('./utils');

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send('');
});

// auth with username and password
router.get('/local', passport.authenticate('local'));

// register new user
router.get('/local/register',
    (req, res, next) => {
        connectToDB();
        const {username, password} = req.query;

        checkUserInfoValidity(username, password)
            .then(
                () => {
                    const user = new User({username: username});
                    user.setPassword(password)
                        .then(() => user.save())
                        .then(user => req.login(user, (err) => {
                            if (err) throw err;
                            next()
                        }))
                        .catch(next)
                },
                (err) => {
                    res.status(400).send(err.toString());
                }
            )
            .catch(next);
    },
    redirectHome
);

// auth with google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// callback route for google to redirect to
router.get('/google/callback',
    passport.authenticate('google'),
    redirectHome
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/callback',
    passport.authenticate('facebook'),
    redirectHome
);

async function checkUserInfoValidity(username, password) {
    const user = await User.findOne({username: username});
    const p = password.toLowerCase();
    const u = username.toLowerCase();
    if (user) 
        throw new Error("Username taken");
    if (password.length < 8) 
        throw new Error("Password must has at least 8 characters");
    if (u.includes(p) || p.includes(u))
        throw new Error("Password and username are too similar");
    return true;
}

module.exports = router;