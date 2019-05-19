const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
});

let User = mongoose.model('User', userSchema);

module.exports = User;
