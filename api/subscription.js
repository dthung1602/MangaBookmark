const express = require("express");
const router = express.Router();
const { handlerWrapper } = require("./utils");
const SubscriptionService = require("services/subscription-service");
const { SubscriptionCreateValidator, SubscriptionDeleteValidator } = require("services/validation-service");

//-----------------------------------
//  List all subscription of user
//-----------------------------------

router.get(
  "/",
  handlerWrapper(async (req, res) => {
    const subs = await SubscriptionService.list(req.user);
    res.json(subs);
  }),
);

//-----------------------------------
//  Subscribe
//-----------------------------------

router.post(
  "/",
  SubscriptionCreateValidator,
  handlerWrapper(async (req, res) => {
    const sub = await SubscriptionService.create(req.body);
    res.json(sub);
  }),
);

//-----------------------------------
//  Unsubscribe
//-----------------------------------

router.delete(
  "/",
  SubscriptionDeleteValidator,
  handlerWrapper(async (req, res) => {
    await SubscriptionService.delete(req.sub);
    res.json({});
  }),
);

module.exports = router;
