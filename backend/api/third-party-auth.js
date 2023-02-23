import { Router } from "@awaitjs/express";
import passport from "passport";

import { removePassword } from "./utils.js";
import UserService from "../services/user-service/index.js";
import { UserUnlinkAccountValidator, UserThirdPartyAuthValidator } from "../services/validation-service/index.js";

const router = Router({ mergeParams: true });

//-----------------------------------
//  Authentication with third party
//-----------------------------------
/**
 * @swagger
 *
 * /api/user/{authProvider}/auth:
 *   get:
 *     parameters:
 *       - in: path
 *         name: authProvider
 *         description: specifies which third party to use
 *         schema:
 *           type: string
 *           enum: [google,facebook]
 *       - in: query
 *         name: action
 *         description: specifies which action to take
 *         schema:
 *           type: string
 *           enum: [register,login,link]
 *     description: Authentication using Google/Facebook OAuth2
 *     responses:
 *       302:
 *         description: Redirect to Google/Facebook authentication page
 */
router.get("/auth", UserThirdPartyAuthValidator, (req, res, next) => {
  const { authProvider } = req.params;
  const scope = {
    google: ["email", "profile"],
    facebook: ["email"],
  }[authProvider];

  return passport.authenticate(authProvider, {
    scope,
    state: req.query.action,
  })(req, res, next);
});

//-----------------------------------------
//  Callback on successful authentication
//-----------------------------------------
/**
 * @swagger
 *
 * /api/user/{authProvider}/callback:
 *   get:
 *     parameters:
 *       - in: path
 *         name: authProvider
 *         description: specifies which third party to use
 *         schema:
 *           type: string
 *           enum: [google,facebook]
 *     description: Google/Facebook login/register/link callback.
 *     responses:
 *       302:
 *         description: Success - Redirect to quick access page. Failure - Redirect to login page
 */
router.get("/callback", (req, res, next) => {
  return passport.authenticate(req.params.authProvider, {
    successRedirect: "/quick-access",
    failureRedirect: "/login",
  })(req, res, next);
});

//--------------------------------------------------
//  Unlink third party account from main account
//--------------------------------------------------
/**
 * @swagger
 *
 * /api/user/{authProvider}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: authProvider
 *         description: specifies which third party to use
 *         schema:
 *           type: string
 *           enum: [google,facebook]
 *     description: Remove Google/Facebook from current account
 *     responses:
 *       200:
 *         description: Account unlinked successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.deleteAsync("/", UserUnlinkAccountValidator, async (req, res) => {
  const user = await UserService.unlink(req.user, req.params.authProvider);
  res.json(removePassword(user));
});

export default router;
