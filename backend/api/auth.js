const { Router } = require("@awaitjs/express");
const passport = require("passport");

const router = Router();

const { redirectHome } = require("./utils");

//-----------------------------------
//  Logout
//-----------------------------------
/**
 * @swagger
 *
 * /api/auth/logout:
 *   post:
 *     description: Log out of the application
 *     responses:
 *       302:
 *         description: logged out
 */
router.postAsync("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//-----------------------------------
//  Login with username & password
//-----------------------------------
/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     description: Log in to the application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: logged in
 *       401:
 *         description: incorrect username/password
 */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ errors: { "": "" + err } });
    }
    if (!user) {
      return res.status(401).json({ errors: info });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ errors: { "": "" + err } });
      } else {
        res.status(200).end();
      }
    });
  })(req, res, next);
});

//-----------------------------------
//  Login with Google
//-----------------------------------
/**
 * @swagger
 *
 * /api/auth/google:
 *   get:
 *     description: Log in using Google. See [this](https://developers.google.com/identity/protocols/oauth2)
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */
router.getAsync("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @swagger
 *
 * /api/auth/google/callback:
 *   get:
 *     description: Google login callback. See [this](https://developers.google.com/identity/protocols/oauth2)
 *     responses:
 *       302:
 *         description: Logged in successfully. Redirect home.
 */
router.getAsync("/google/callback", passport.authenticate("google"), redirectHome);

//-----------------------------------
//  Login with Facebook
//-----------------------------------
/**
 * @swagger
 *
 * /api/auth/facebook:
 *   get:
 *     description: Log in using Facebook. See [this](https://developers.facebook.com/docs/facebook-login/)
 *     responses:
 *       302:
 *         description: Redirect to Facebook login page
 */
router.getAsync("/facebook", passport.authenticate("facebook"));

/**
 * @swagger
 *
 * /api/auth/facebook/callback:
 *   get:
 *     description: Facebook login callback. See [this](https://developers.facebook.com/docs/facebook-login/)
 *     responses:
 *       302:
 *         description: Logged in successfully. Redirect home.
 */
router.getAsync("/facebook/callback", passport.authenticate("facebook"), redirectHome);

module.exports = router;
