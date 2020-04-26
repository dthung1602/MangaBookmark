const { check } = require("express-validator");

const { Subscription } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("subscription")
    .exists()
    .custom(async (pushServiceId, { req }) => {
      const sub = await Subscription.findById(pushServiceId);
      if (sub === null || sub.user.toString() !== req.user.id) {
        throw new Error("Cannot find push service");
      }
      req.sub = sub;
    }),
  ErrorFormatter,
];
