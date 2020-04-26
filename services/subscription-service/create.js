const { pick } = require("lodash");

const { Subscription } = require("../../models");

const fields = ["user", "browser", "os", "endpoint", "auth", "p256h"];

module.exports = async function (data) {
  const subscription = new Subscription(pick(data, fields));
  return await subscription.save();
};
