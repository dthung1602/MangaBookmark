const { Router } = require("@awaitjs/express");
const router = Router();

const SubscriptionService = require("../services/subscription-service");
const { SubscriptionCreateValidator, SubscriptionDeleteValidator } = require("../services/validation-service");

//-----------------------------------
//  List all subscription of user
//-----------------------------------

router.getAsync("/", async (req, res) => {
  const subs = await SubscriptionService.list(req.user);
  res.json(subs);
});

//-----------------------------------
//  Subscribe
//-----------------------------------

router.postAsync("/", SubscriptionCreateValidator, async (req, res) => {
  const sub = await SubscriptionService.create(req.body);
  res.json(sub);
});

//-----------------------------------
//  Unsubscribe
//-----------------------------------

router.deleteAsync("/", SubscriptionDeleteValidator, async (req, res) => {
  await SubscriptionService.delete(req.sub);
  res.json({});
});

module.exports = router;
