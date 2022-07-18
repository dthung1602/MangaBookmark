const { User } = require("../../../models");

module.exports = function (req, res, next) {
  User.findById(req.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next(err));
};
