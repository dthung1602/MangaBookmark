const { Subscription } = require("../../models");

module.exports = async function (user) {
  return Subscription.find({ user: user.id });
};
