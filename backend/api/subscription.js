const { Router } = require("@awaitjs/express");
const router = Router();

const SubscriptionService = require("../services/subscription-service");
const { SubscriptionCreateValidator, SubscriptionDeleteValidator } = require("../services/validation-service");

//-----------------------------------
//  List all subscription of user
//-----------------------------------
/**
 * @swagger
 *
 * /api/subscriptions:
 *   get:
 *     description: Get all subscriptions of the current user
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Subscription'
 */
router.getAsync("/", async (req, res) => {
  const subs = await SubscriptionService.list(req.user);
  res.json(subs);
});

//-----------------------------------
//  Subscribe
//-----------------------------------
/**
 * @swagger
 *
 * /api/subscriptions:
 *   post:
 *     description: Subscribe this browser for web push notifications
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               browser:
 *                 type: string
 *                 enum: [Opera, Chrome, Safari, Firefox, Edge, Samsung, Unknown Browser]
 *               os:
 *                 type: string
 *                 enum: [Windows, MacOS, Linux, Android, iOS, Unknown OS]
 *               endpoint:
 *                 type: string
 *                 format: uri
 *               auth:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Subscription'
 */
router.postAsync("/", SubscriptionCreateValidator, async (req, res) => {
  const sub = await SubscriptionService.create({ ...req.body, user: req.user.id });
  res.status(201).json(sub);
});

//-----------------------------------
//  Unsubscribe
//-----------------------------------
/**
 * @swagger
 *
 * /api/subscriptions/{subId}:
 *   delete:
 *     description: Unsubscribe this browser from web push notifications
 *     parameters:
 *       - in: path
 *         name: subId
 *         schema:
 *           $ref: '#/components/schemas/Id'
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.deleteAsync("/:subscription", SubscriptionDeleteValidator, async (req, res) => {
  await SubscriptionService.delete(req.sub);
  res.sendStatus(204);
});

module.exports = router;
