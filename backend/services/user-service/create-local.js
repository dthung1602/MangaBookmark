const { User } = require("../../models");

module.exports = async function (data) {
  const user = new User(data);
  user.primaryAccount = "local";
  await user.save();
  return user;
};
