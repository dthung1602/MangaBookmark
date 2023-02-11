import { pickCopy } from "../utils/index.js";

export default async function (user, data) {
  pickCopy(user, data, ["username", "email", "avatar", "note"], true);
  return user.save();
}
