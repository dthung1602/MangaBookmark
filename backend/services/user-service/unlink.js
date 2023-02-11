export default async function (user, authProvider) {
  if (authProvider !== "facebook" && authProvider !== "google") {
    throw new Error(`Invalid auth provider '${authProvider}'`);
  }
  if (user[authProvider + "Pic"] === user.avatar) {
    const alternativeAuthProvider = authProvider === "google" ? "facebook" : "google";
    user.avatar = user[alternativeAuthProvider + "Pic"];
  }
  user[authProvider + "Id"] = null;
  user[authProvider + "Name"] = null;
  user[authProvider + "Pic"] = null;
  return await user.save();
}
