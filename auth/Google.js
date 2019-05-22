const passport = require('passport/lib');
const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;

const {User, connectToDB} = require('../models');
const config = require('../config');

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_AUTH_ID,
            clientSecret: config.GOOGLE_AUTH_PASSWORD,
            callbackURL: '/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            connectToDB();

            // check if user already exists in our own db
            User.findOne({googleId: profile.id}).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    new User({
                        googleId: profile.id,
                        username: profile.displayName
                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
            });
        }
    )
);