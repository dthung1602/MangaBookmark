import { User } from "../../models/index.js";

export default async function ({ username, email, password }) {
  const user = new User({ username, email, password });
  await user.save();
  return user;
}
