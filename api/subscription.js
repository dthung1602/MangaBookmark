const express = require("express");
const router = express.Router();

const SubscriptionService = require("../services/subscription-service");
const { SubscriptionCreateValidator, SubscriptionDeleteValidator } = require("../services/validation-service");

//-----------------------------------
//  List all subscription of user
//-----------------------------------

router.get("/", async (req, res) => {
  const subs = await SubscriptionService.list(req.user);
  res.json(subs);
});

//-----------------------------------
//  Subscribe
//-----------------------------------

router.post("/", SubscriptionCreateValidator, async (req, res) => {
  const sub = await SubscriptionService.create(req.body);
  res.json(sub);
});

//-----------------------------------
//  Unsubscribe
//-----------------------------------

router.delete("/", SubscriptionDeleteValidator, async (req, res) => {
  await SubscriptionService.delete(req.sub);
  res.json({});
});

module.exports = router;
