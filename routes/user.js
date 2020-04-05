const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { User, Manga, connectToDB } = require("../models");
const { handlerWrapper } = require("./utils");

router.get(
  "/",
  handlerWrapper(async (req, res) => {
    const user = await User.findById(req.user.id);
    user.password = !!user.password;
    res.json(user);
  }),
);

router.get(
  "/edit",
  check("username")
    .exists()
    .isLength({ min: 1 })
    .custom(async (username, { req }) => {
      connectToDB();
      const user = await User.findById(req.user.id);
      const usernameUser = await User.findOne({ username: username });
      if (usernameUser && usernameUser.id !== user.id)
        throw new Error("Username taken");
      req.user = user;
    }),
  check("email")
    .exists()
    .isEmail()
    .custom(async (email, { req }) => {
      connectToDB();
      const emailUSer = await User.findOne({ email: email });
      if (emailUSer && emailUSer.id !== req.user.id)
        throw new Error(
          "This email has already been registered for an account",
        );
    }),

  handlerWrapper(async (req, res) => {
    const { user } = req;
    user.username = req.query.username;
    user.email = req.query.email;
    await user.save();
    res.json({});
  }),
);

router.get(
  "/changepass",
  check("password").exists().isLength({ min: 8 }),
  check("currentPassword")
    .exists()
    .custom(async (value, { req }) => {
      connectToDB();
      const user = await User.findById(req.user.id);
      if (user.password && !user.validPassword(value))
        throw new Error("Invalid current password");
      req.user = user;
    }),

  handlerWrapper(async (req, res) => {
    const { user } = req;
    user.password = req.query.password;
    await user.save();
    res.json({});
  }),
);

router.get(
  "/delete",
  handlerWrapper(async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    await Manga.deleteMany({ user: req.user.id });
    req.logout();
    res.redirect("/");
  }),
);

module.exports = router;
