const express = require("express");
const router = express.Router();

const { User } = require("../models");
const { redirectHome } = require("./utils");
const UserService = require("services/user-service");
const {
  UserPassValidator,
  UserPatchValidator,
  LocalUserRegistrationValidator,
  UnlinkAccountValidator,
} = require("services/validation-service");

//-----------------------------------
//  Resister new user
//-----------------------------------
router.post(
  "/",
  LocalUserRegistrationValidator,
  async (req, res, next) => {
    const user = await UserService.createLocal(req.query);
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(user);
      }
    });
  },
  redirectHome,
);

//-----------------------------------
//  Get current user profile
//-----------------------------------

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.id);
  user.password = !!user.password;
  res.json(user);
});

//-----------------------------------
//  Edit user profile
//-----------------------------------

router.patch("/", UserPatchValidator, async (req, res) => {
  const user = await UserService.patch(req.user, req.query);
  res.status(200).json(user);
});

//-----------------------------------
//  Change password
//-----------------------------------

router.patch("/change-password", UserPassValidator, async (req, res) => {
  await UserService.changePassword(req.user, req.query.password);
  res.status(204).json({});
});

//-----------------------------------
//  Unlink account
//-----------------------------------

router.patch("/unlink", UnlinkAccountValidator, async (req, res) => {
  const { newPrimaryAccount, provider } = req.query;
  const { user } = req;

  await UserService.unlink(user, provider, newPrimaryAccount);

  res.status(204).json({});
});

//-----------------------------------
//  Delete user
//-----------------------------------

router.delete("/", async (req, res) => {
  await UserService.delete(req.user);
  req.logout();
  res.redirect("/");
});

module.exports = router;
