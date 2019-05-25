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

// unlink account
router.get('/:provider/unlink',
    check('provider').exists().isIn(['google', 'facebook']),
    check('newPrimaryAccount').exists().isIn(['local', 'facebook', 'google'])
        .custom(async (value, {req}) => {
            if (value === req.params.provider) 
                throw new Error("Primary account must be changed after unlink");
            
            connectToDB();
            const user = await User.findById(req.user.id);
            if (value === 'google' && !user.googleId)
                throw new Error("There's no linked Google account");
            if (value === 'facebook' && !user.facebookId)
                throw new Error("There's no linked Facebook account");
            req.user = user;
        }),

    handlerWrapper(async (req, res) => {
        const {provider} = req.params;
        const {newPrimaryAccount} = req.query;
        const {user} = req;

        user[provider + 'Id'] = null;
        user[provider + 'Name'] = null;
        user[provider + 'Pic'] = null;
        user.primaryAccount = newPrimaryAccount;

        await user.save();
        res.json({})
    })
);

module.exports = router;