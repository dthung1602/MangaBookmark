const { Router } = require("@awaitjs/express");
const passport = require("passport");

const { ValidationError } = require("../exceptions");
const router = Router();

const { redirectHome } = require("./utils");

//-----------------------------------
//  Logout
//-----------------------------------

router.postAsync("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//-----------------------------------
//  Login with username & password
//-----------------------------------

router.postAsync("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      throw new Error(String(err));
    }
    if (!user) {
      throw new ValidationError({ login: info });
    }
    req.login(user, (err) => {
      if (err) {
        next(new Error(String(err)));
      } else {
        next();
      }
    });
  })(req, res, next);
});

//-----------------------------------
//  Login with Google
//-----------------------------------

router.getAsync("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.getAsync("/google/callback", passport.authenticate("google"), redirectHome);

//-----------------------------------
//  Login with Facebook
//-----------------------------------

router.getAsync("/facebook", passport.authenticate("facebook"));

router.getAsync("/facebook/callback", passport.authenticate("facebook"), redirectHome);

module.exports = router;
