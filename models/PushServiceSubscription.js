const mongoose = require("mongoose");

let subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  browser: {
    type: String,
    enum: ["Opera", "Internet Explorer", "Chrome", "Safari", "Firefox", "Unknown"],
  },
  os: {
    type: String,
    enum: ["Windows", "MacOS", "Linux", "Android", "iOS", "Unknown"],
  },
  endpoint: String,
  auth: String,
  p256dh: String,
});

subscriptionSchema.index({ endpoint: 1 }, { unique: true });

subscriptionSchema.methods.toStdFormat = function () {
  return {
    endpoint: this.endpoint,
    keys: {
      auth: this.auth,
      p256dh: this.p256dh,
    },
  };
};

module.exports = mongoose.model("Subscription", subscriptionSchema);
