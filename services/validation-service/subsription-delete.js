const { check } = require("express-validator");
const { Subscription } = require("models");
const { ensureDBConnection } = require("services/db-service");

module.exports = [
  check("subscription")
    .exists()
    .custom(async (pushServiceId, { req }) => {
      await ensureDBConnection();
      const sub = await Subscription.findById(pushServiceId);
      if (sub === null || sub.user.toString() !== req.user.id) {
        throw new Error("Cannot find push service");
      }
      req.sub = sub;
    }),
];
