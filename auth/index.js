const passport = require('passport/lib');

require('./Google');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    done(null, {id: userId});
});

module.exports = (req, res, next) => {
    console.log(req.user);
    if (req.user)
        next();
    else
        res.status(403).send('Please login and try again');
};