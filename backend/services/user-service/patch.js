const { pickCopy } = require("../utils");

module.exports = async function (user, data) {
  pickCopy(user, data, ["username", "email", "avatar", "note"], true);
  return user.save();
};
