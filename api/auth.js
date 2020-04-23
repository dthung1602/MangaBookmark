const express = require("express");
const router = express.Router();

const { authenticate } = require("services/auth-service");
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

module.exports = router;
