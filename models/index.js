const mongoose = require('mongoose');
const {DB_URL} = require('../config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

async function connectToDB() {
    const state = mongoose.connection.readyState;
    if (state === 0 || state === 3)
        return mongoose.connect(DB_URL);
    return true
}

module.exports = {
    connectToDB: connectToDB,
    Manga: require('./Manga'),
    User: require('./User')
};