const express = require("express");
const router = express.Router();

const { User } = require("../models");
const { handlerWrapper } = require("./utils");
const UserService = require("services/user-service");
const { UserPassValidator, UserPatchValidator } = require("services/validation-service");

//-----------------------------------
//  Get current user profile
//-----------------------------------

router.get(
  "/",
  handlerWrapper(async (req, res) => {
    const user = await User.findById(req.user.id);
    user.password = !!user.password;
    res.json(user);
  }),
);

//-----------------------------------
//  Edit user profile
//-----------------------------------

router.patch(
  "/",
  UserPatchValidator,
  handlerWrapper(async (req, res) => {
    const user = await UserService.patch(req.user, req.query);
    res.json(user);
  }),
);

//-----------------------------------
//  Change password
//-----------------------------------

router.patch(
  "/change-password",
  UserPassValidator,
  handlerWrapper(async (req, res) => {
    await UserService.changePassword(req.user, req.query.password);
    res.json({});
  }),
);

//-----------------------------------
//  Delete user
//-----------------------------------

router.delete(
  "/",
  handlerWrapper(async (req, res) => {
    await UserService.delete(req.user);
    req.logout();
    res.redirect("/");
  }),
);

module.exports = router;
