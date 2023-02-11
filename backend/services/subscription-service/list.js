import { Subscription } from "../../models/index.js";

export default async function (user) {
  return Subscription.find({ user: user.id });
}
