const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {User, connectToDB} = require('../models');


passport.use(new LocalStrategy(
    (username, password, done) => {
        connectToDB();
        User.findOne(
            {username: username},
            (err, user) => {
                if (err) return done(err, false);
                if (!user || !user.validPassword(password))
                    return done(null, false, {message: 'Incorrect username or password'});
                return done(null, user);
            }
        );
    }
));
