const { Subscription } = require("../../models");

module.exports = async function (subscription) {
  await Subscription.findByIdAndDelete(subscription.id);
};
