import lodash from "lodash";
import { Subscription } from "../../models/index.js";

const { pick } = lodash;
const fields = ["user", "browser", "os", "endpoint", "auth", "p256dh"];

export default async function (data) {
  const subscription = new Subscription(pick(data, fields));
  return await subscription.save();
}
