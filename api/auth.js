const express = require("express");
const passport = require("passport");
const router = express.Router();

const { redirectHome } = require("./utils");

//-----------------------------------
//  Logout
//-----------------------------------

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//-----------------------------------
//  Login with username & password
//-----------------------------------

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      throw { code: 500, message: String(err) };
    }
    if (!user) {
      throw { code: 400, message: info };
    }
    req.login(user, (err) => {
      if (err) {
        next({ code: 500, message: String(err) });
      } else {
        next();
      }
    });
  })(req, res, next);
});

//-----------------------------------
//  Login with Google
//-----------------------------------

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), redirectHome);

//-----------------------------------
//  Login with Facebook
//-----------------------------------

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook"), redirectHome);

module.exports = router;
