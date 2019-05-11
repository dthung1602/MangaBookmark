let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let mangaRouter = require('./routes/manga');
let chapterRouter = require('./routes/chapter');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// Static files handled by React
app.use(express.static(path.join(__dirname, 'react-mb-client/build')));

// API
app.use('/api/manga', mangaRouter);
app.use('/api/chapter', chapterRouter);

// Any request that doesn't match one above, send back React's index.html file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/react-mb-client/build/index.html'));
// });

module.exports = app;
