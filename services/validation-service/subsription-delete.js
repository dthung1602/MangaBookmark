const { check } = require("express-validator");

const { NotFoundError, PermissionError } = require("../../exceptions");
const { Subscription } = require("../../models");
const ErrorFormatter = require("./validation-error-formatter");

module.exports = [
  check("subscription")
    .exists()
    .custom(async (subscriptionId, { req }) => {
      const sub = await Subscription.findById(subscriptionId);
      if (sub === null) {
        throw new NotFoundError();
      }
      if (req.sub.user.toString() !== req.user.id) {
        throw new PermissionError();
      }
      req.sub = sub;
    }),
  ErrorFormatter,
];
