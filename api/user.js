const { Router } = require("@awaitjs/express");
const router = Router();

const { User } = require("../models");
const UserService = require("../services/user-service");
const {
  UserPassValidator,
  UserPatchValidator,
  LocalUserRegistrationValidator,
  UnlinkAccountValidator,
} = require("../services/validation-service");

function removePassword(user) {
  user = JSON.parse(JSON.stringify(user));
  user.password = !!user.password;
  return user;
}

//-----------------------------------
//  Resister new user
//-----------------------------------
router.postAsync("/", LocalUserRegistrationValidator, async (req, res, next) => {
  const user = await UserService.createLocal(req.body);
  req.login(user, (err) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json(removePassword(user));
    }
  });
});

//-----------------------------------
//  Get current user profile
//-----------------------------------

router.getAsync("/", async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(removePassword(user));
});

//-----------------------------------
//  Edit user profile
//-----------------------------------

router.patchAsync("/", UserPatchValidator, async (req, res) => {
  const user = await UserService.patch(req.user, req.body);
  res.json(removePassword(user));
});

//-----------------------------------
//  Change password
//-----------------------------------

router.patchAsync("/change-password", UserPassValidator, async (req, res) => {
  await UserService.changePassword(req.user, req.body.password);
  res.sendStatus(204);
});

//-----------------------------------
//  Unlink account
//-----------------------------------

router.patchAsync("/unlink", UnlinkAccountValidator, async (req, res) => {
  const { newPrimaryAccount, provider } = req.body;
  const { user } = req;

  await UserService.unlink(user, provider, newPrimaryAccount);

  res.sendStatus(204);
});

//-----------------------------------
//  Delete user
//-----------------------------------

router.deleteAsync("/", async (req, res) => {
  await UserService.delete(req.user);
  req.logout();
  res.sendStatus(204);
});

module.exports = router;
