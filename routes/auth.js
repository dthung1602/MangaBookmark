const passport = require('passport');
const express = require('express');
const router = express.Router();

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

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