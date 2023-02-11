import { Subscription } from "../../models/index.js";

export default async function (subscription) {
  await Subscription.findByIdAndDelete(subscription.id);
}
