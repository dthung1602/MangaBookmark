const express = require("express");
const router = express.Router();

const { authenticate } = require("services/auth-service");
const { redirectHome, handlerWrapper } = require("./utils");
const { RegistrationValidator, UnlinkAccountValidator } = require("services/validation-service");
const UserService = require("services/user-service");

//-----------------------------------
//  Logout
//-----------------------------------

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//-----------------------------------
//  Resister new user
//-----------------------------------
router.get(
  "/local/register",
  RegistrationValidator,
  handlerWrapper(async (req, res, next) => {
    const user = await UserService.createLocal(req.query);

    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  }),
  redirectHome,
);

//-----------------------------------
//  Login with username & password
//-----------------------------------

router.get("/local", (req, res, next) => {
  authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  })(req, res, next);
});

//-----------------------------------
//  Login with Google
//-----------------------------------

router.get("/google", authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", authenticate("google"), redirectHome);

//-----------------------------------
//  Login with Facebook
//-----------------------------------

router.get("/facebook", authenticate("facebook"));

router.get("/facebook/callback", authenticate("facebook"), redirectHome);

//-----------------------------------
//  Unlink account
//-----------------------------------

router.get(
  "/:provider/unlink",
  UnlinkAccountValidator,
  handlerWrapper(async (req, res) => {
    const { provider } = req.params;
    const { newPrimaryAccount } = req.query;
    const { user } = req;

    await UserService.unlink(user, provider, newPrimaryAccount);

    res.json({});
  }),
);

module.exports = router;
