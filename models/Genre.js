const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let genreSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Genre', genreSchema);
