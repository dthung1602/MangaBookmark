import * as expressValidator from "express-validator";
import { Subscription } from "../../models/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;
const { OSs, Browsers } = Subscription;

export default [
  check("os").exists().isIn(Object.values(OSs)),
  check("browser").exists().isIn(Object.values(Browsers)),
  check("endpoint")
    .exists()
    .isURL()
    .custom(async (endpoint) => {
      const count = await Subscription.countDocuments({ endpoint: endpoint });
      if (count > 0) {
        throw new Error("Subscription has already been added");
      }
    }),
  check("auth").exists(),
  check("p256dh").exists(),
  ErrorFormatter,
];
