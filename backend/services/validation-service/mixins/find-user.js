import { User } from "../../../models/index.js";

export default function (req, res, next) {
  User.findById(req.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next(err));
}
