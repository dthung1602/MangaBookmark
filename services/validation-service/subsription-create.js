const { check } = require("express-validator");
const { Subscription } = require("models");
const { OSs, Browsers } = Subscription;
const { ensureDBConnection } = require("services/db-service");

module.exports = [
  check("os").exists().isIn(Object.values(OSs)),
  check("browser").exists().isIn(Object.values(Browsers)),
  check("endpoint")
    .exists()
    .isURL()
    .custom(async (endpoint) => {
      await ensureDBConnection();
      const count = await Subscription.count({ endpoint: endpoint });
      if (count > 0) {
        throw new Error("Subscription has already been added");
      }
    }),
  check("auth").exists(),
  check("p256dh").exists(),
];
