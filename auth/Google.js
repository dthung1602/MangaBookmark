const passport = require('passport/lib');
const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;

const {User, connectToDB} = require('../models');
const config = require('../config');

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_AUTH_ID,
            clientSecret: config.GOOGLE_AUTH_PASSWORD,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            connectToDB();

            // check if user already exists in our own db
            const googleUser = await User.findOne({googleId: profile.id});

            // found -> login
            if (googleUser) {
                done(null, googleUser);
                return
            }

            // not found:
            //    user has login -> link account
            //    else ->  create user
            const user = (req.user)
                ? await User.findById(req.user.id)
                : new User({primaryAccount: 'google'});

            user.googleId = profile.id;
            user.googlePic = profile.photos[0].value;
            user.googleName = profile.displayName;
            if (!user.email)
                user.email = profile.emails[0].value;

            await user.save();
            done(null, user);
        }
    )
);


