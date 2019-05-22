const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String
});

userSchema.methods.validPassword = function (password) {
    if (!this.password)
        return false;
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.setPassword = function (newPassword) {
    return bcrypt.hash(newPassword, config.LOCAL_AUTH_SALT_ROUND)
        .then(hash => this.password = hash)
};

userSchema.methods.resetPassword = () => {
    return bcrypt
        .genSalt(config.LOCAL_AUTH_PASS_ROUND)
        .then(newPassword =>
            bcrypt.hash(newPassword, config.LOCAL_AUTH_SALT_ROUND)
                .then(hash => {
                    this.password = hash;
                    return newPassword;
                })
        )
};

let User = mongoose.model('User', userSchema);

module.exports = User;
