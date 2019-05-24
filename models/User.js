const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config');

function setPassword(newPassword) {
    return bcrypt.hashSync(newPassword, config.LOCAL_AUTH_SALT_ROUND);
}

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: {
        type: String,
        set: setPassword,
    },
    googleId: String,
    facebookId: String
});

userSchema.methods.validPassword = function (password) {
    if (!this.password)
        return false;
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.resetPassword = () => {
    const newPassword = bcrypt.genSaltSync(config.LOCAL_AUTH_PASS_ROUND);
    this.password = newPassword;
    return newPassword;
};

userSchema.index({username: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});

let User = mongoose.model('User', userSchema);

module.exports = User;
