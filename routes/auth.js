const passport = require('passport');
const express = require('express');
const router = express.Router();

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

module.exports = router;