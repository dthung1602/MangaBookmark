const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const authRouter = require('./routes/auth');
const mangaRouter = require('./routes/manga');
const chapterRouter = require('./routes/chapter');
const userRouter = require('./routes/user');
const notificationRouter = require('./routes/notification');
const authCheck = require('./auth');
const app = express();

function enforceHttps() {
    return function (req, res, next) {
        if (config.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    }
}

app.enable("trust proxy"); // let Google & facebook use https
app.use(enforceHttps());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// set up session cookies
app.use(cookieSession({
    maxAge: config.COOKIE_MAX_AGE,
    keys: [config.SECRET_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Static files & index.html handled by React
app.use(express.static(path.join(__dirname, 'react-mb-client/build')));

// API
app.use('/auth', authRouter);
app.use('/api/manga', authCheck, mangaRouter);
app.use('/api/chapter', authCheck, chapterRouter);
app.use('/api/user', authCheck, userRouter);
app.use('/api/notification', authCheck, notificationRouter);

// Any request that doesn't match one above, send back React's index.html file/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/react-mb-client/build/index.html'));
});

module.exports = app;
