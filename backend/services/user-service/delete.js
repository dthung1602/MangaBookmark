import { User, Manga, Subscription } from "../../models/index.js";

export default async function (user) {
  await Manga.deleteMany({ user: user.id });
  await Subscription.deleteMany({ user: user.id });
  await User.findByIdAndDelete(user.id);
}
