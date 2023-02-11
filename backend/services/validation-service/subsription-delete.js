import * as expressValidator from "express-validator";
import { NotFoundError, PermissionError } from "../../errors.js";
import { Subscription } from "../../models/index.js";
import { ErrorFormatter } from "./mixins/index.js";

const { check } = expressValidator;

export default [
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
