const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const config = require("../config");

function setPassword(newPassword) {
  return bcrypt.hashSync(newPassword, config.LOCAL_AUTH_SALT_ROUND);
}

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          googleId:
 *            type: string
 *          googlePic:
 *            type: string
 *            format: uri
 *          googleName:
 *            type: string
 *          facebookId:
 *            type: string
 *          facebookPic:
 *            type: string
 *            format: uri
 *          facebookName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          primaryAccount:
 *            type: string
 *            enum: [local, google, facebook]
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
let userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    set: setPassword,
  },

  googleId: String,
  googlePic: String,
  googleName: String,

  facebookId: String,
  facebookPic: String,
  facebookName: String,

  email: String,
  primaryAccount: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
});

userSchema.methods.validPassword = function (password) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.resetPassword = () => {
  const newPassword = bcrypt.genSaltSync(config.LOCAL_AUTH_PASS_ROUND);
  this.password = newPassword;
  return newPassword;
};

userSchema.index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: { username: { $ne: null } },
  },
);
userSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: { googleId: { $ne: null } },
  },
);
userSchema.index(
  { facebookId: 1 },
  {
    unique: true,
    partialFilterExpression: { facebookId: { $ne: null } },
  },
);
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $ne: null } },
  },
);

let User = mongoose.model("User", userSchema);

module.exports = User;
