const { User } = require("../../models");

module.exports = async function ({ username, email, password }) {
  const user = new User({ username, email, password });
  await user.save();
  return user;
};
