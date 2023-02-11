import { User } from "../../models/index.js";
import { ValidationError } from "../../errors.js";
import linkUserToThirdPartyAuthService from "./link.js";

export default async function (authProvider, profile) {
  const authProviderId = `${authProvider}Id`;
  const duplicatedUser = await User.findOne({ [authProviderId]: profile.id });
  if (duplicatedUser) {
    throw new ValidationError({ [authProviderId]: "User already existed" });
  }

  return linkUserToThirdPartyAuthService(new User(), authProvider, profile);
}
