import lodash from "lodash";

const { get } = lodash;

export default async function (user, authProvider, profile) {
  if (authProvider !== "facebook" && authProvider !== "google") {
    throw new Error(`Invalid auth provider '${authProvider}'`);
  }
  user[`${authProvider}Id`] = profile.id;
  user[`${authProvider}Pic`] = get(profile, "photos[0].value");
  user[`${authProvider}Name`] = profile.displayName;
  user.email = user.email || get(profile, "emails[0].value");
  user.avatar = user.avatar || user[`${authProvider}Pic`];
  user.username = user.username || user[`${authProvider}Name`];
  return user.save();
}
