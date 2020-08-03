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
 *               oldPassword:
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

//-----------------------------------
//  Unlink account
//-----------------------------------
/**
 * @swagger
 *
 * /api/user/unlink:
 *   patch:
 *     description: Remove Google/Facebook from current account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [google, facebook]
 *               newPrimaryAccount:
 *                 type: string
 *                 enum: [google, facebook, local]
 *                 description: The new primary account used for login. Must be different from `provider`
 *     responses:
 *       204:
 *         description: Account unlinked successfully
 */
router.patchAsync("/unlink", UnlinkAccountValidator, async (req, res) => {
  const { newPrimaryAccount, provider } = req.body;
  const { user } = req;

  await UserService.unlink(user, provider, newPrimaryAccount);

  res.sendStatus(204);
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

module.exports = router;
