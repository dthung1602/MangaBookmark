const mongoose = require("mongoose");

const Browsers = Object.freeze({
  OP: "Opera",
  IE: "Internet Explorer",
  CH: "Chrome",
  SA: "Safari",
  FF: "Firefox",
  UK: "Unknown",
});

const OSs = Object.freeze({
  WIN: "Windows",
  MAC: "MacOS",
  LNX: "Linux",
  ADR: "Android",
  IOS: "iOS",
  UNK: "Unknown",
});

let SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  browser: {
    type: String,
    enum: Object.values(Browsers),
  },
  os: {
    type: String,
    enum: Object.values(OSs),
  },
  endpoint: String,
  auth: String,
  p256dh: String,
});

SubscriptionSchema.index({ endpoint: 1 }, { unique: true });

SubscriptionSchema.methods.toStdFormat = function () {
  return {
    endpoint: this.endpoint,
    keys: {
      auth: this.auth,
      p256dh: this.p256dh,
    },
  };
};

Object.assign(SubscriptionSchema.statics, {
  Browsers,
  OSs,
});

let Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
