const mongoose = require('mongoose');
const {DB_URL} = require('../config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function connectToDB(errHandler) {
    const state = mongoose.connection.readyState;
    if (state === 0 || state === 3) {
        mongoose.connect(DB_URL)
            .catch((err) => {
                console.error(err);
                errHandler("ERROR: Failed to connect to database.");
            });
    }
}

function closeDB() {
    mongoose.connection.close();
}

module.exports = {connectToDB, closeDB};