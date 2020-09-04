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

/**
 * @swagger
 *
 * components:
 *    schemas:
 *      Subscription:
 *        type: object
 *        properties:
 *          id:
 *            $ref: '#/components/schemas/Id'
 *          user:
 *            $ref: '#/components/schemas/Id'
 *          browser:
 *            type: string
 *            enum: [Opera, Internet Explorer, Chrome, Firefox, Safari, Unknown]
 *          os:
 *            type: string
 *            enum: [Windows, MacOS, Linux, Android, iOS, Unknown]
 *          endpoint:
 *            type: string
 *            format: uri
 *          auth:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
let SubscriptionSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

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
