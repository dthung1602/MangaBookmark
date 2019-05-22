const passport = require('passport/lib');
const FacebookStrategy = require('passport-facebook').Strategy;

const {User, connectToDB} = require('../models');
const config = require('../config');

passport.use(
    new FacebookStrategy(
        {
            clientID: config.FACEBOOK_AUTH_ID,
            clientSecret: config.FACEBOOK_AUTH_PASSWORD,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'email', 'displayName']
        },
        function (accessToken, refreshToken, profile, done) {
            connectToDB();

            // check if user already exists in our own db
            User.findOne({facebookId: profile.id}).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    new User({
                        facebookId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value
                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
            });
        }
    )
);