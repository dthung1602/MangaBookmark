const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

const {User, connectToDB} = require("../models");
const {redirectHome, handlerWrapper} = require('./utils');

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

// auth with username and password
router.get('/local',
    (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            if (err)
                return res.status(500).json({error: err});
            if (!user)
                return res.status(400).json(info);
            req.login(user, (err) => {
                if (err) next(err);
                else next()
            })
        })(req, res, next)
    }
);

// register new user
router.get('/local/register',
    check('username').exists()
        .custom(async (username) => {
            connectToDB();
            if (await User.findOne({username: username}))
                throw new Error('Username taken')
        }),
    check('password').exists().isLength({min: 8}),
    check('email').exists().isEmail()
        .custom(async (email) => {
            connectToDB();
            if (await User.findOne({email: email}))
                throw new Error('This email has already been registered for an account')
        }),

    handlerWrapper(async (req, res, next) => {
        const user = new User(req.query);
        user.primaryAccount = 'local';
        await user.save();
        req.login(user, (err) => {
            if (err) next(err);
            else next()
        })
    }),
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

module.exports = router;