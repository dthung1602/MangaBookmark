import { Router } from "@awaitjs/express";
import passport from "passport";

import ThirdPartyAuthRouter from "./third-party-auth.js";
import { User } from "../models/index.js";
import { removePassword } from "./utils.js";
import UserService from "../services/user-service/index.js";
import {
  UserPassValidator,
  UserPatchValidator,
  UserLocalRegistrationValidator,
} from "../services/validation-service/index.js";

const router = Router();

//-----------------------------------
//  Resister new user
//-----------------------------------
/**
 * @swagger
 *
 * /api/user:
 *   post:
 *     description: Create new user with email & password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.postAsync("/", UserLocalRegistrationValidator, async (req, res, next) => {
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
/**
 * @swagger
 *
 * /api/user:
 *   get:
 *     description: Get current logged in user info
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.getAsync("/", async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.id);
    res.json(removePassword(user));
  } else {
    res.json(null);
  }
});

//-----------------------------------
//  Edit user profile
//-----------------------------------
/**
 * @swagger
 *
 * /api/user:
 *   patch:
 *     description: Edit current user info
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               avatar:
 *                 type: string
 *                 format: url
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: User info updated successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.patchAsync("/", UserPatchValidator, async (req, res) => {
  const user = await UserService.patch(req.user, req.body);
  res.json(removePassword(user));
});

//-----------------------------------
//  Delete user
//-----------------------------------
/**
 * @swagger
 *
 * /api/user:
 *   delete:
 *     description: Delete current user
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.deleteAsync("/", async (req, res) => {
  await UserService.delete(req.user);
  req.logout();
  res.sendStatus(204);
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
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
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
        res.status(200).json(removePassword(user));
      }
    });
  })(req, res, next);
});

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
//  Change password
//-----------------------------------
/**
 * @swagger
 *
 * /api/user/change-password:
 *   patch:
 *     description: Change current user password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       204:
 *         description: Password changed successfully
 */
router.patchAsync("/change-password", UserPassValidator, async (req, res) => {
  await UserService.changePassword(req.user, req.body.password);
  res.sendStatus(204);
});

//-------------------------------------------------
//  Authentication by third-party
//-------------------------------------------------
router.use("/:authProvider(google|facebook)", ThirdPartyAuthRouter);
export default router;
