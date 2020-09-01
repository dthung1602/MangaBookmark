const { User } = require("../../models");

module.exports = async function (data) {
  const user = new User(data);
  await user.save();
  return user;
};
