const { check } = require("express-validator");

const { NotFoundError, PermissionError } = require("../../errors");
const { Subscription } = require("../../models");
const { ErrorFormatter } = require("./mixins");

module.exports = [
  check("subscription")
    .exists()
    .custom(async (subscriptionId, { req }) => {
      const sub = await Subscription.findById(subscriptionId);
      if (sub === null) {
        throw new NotFoundError();
      }
      if (sub.user.toString() !== req.user.id) {
        throw new PermissionError();
      }
      req.sub = sub;
    }),
  ErrorFormatter,
];
