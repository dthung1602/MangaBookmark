const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    facebookId: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
