const { User } = require("../../models");
const { ValidationError } = require("../../errors");
const linkUserToThirdPartyAuthService = require("./link");

module.exports = async function (authProvider, profile) {
  const authProviderId = `${authProvider}Id`;
  const duplicatedUser = await User.findOne({ [authProviderId]: profile.id });
  if (duplicatedUser) {
    throw new ValidationError({ [authProviderId]: "User already existed" });
  }

  return linkUserToThirdPartyAuthService(new User(), authProvider, profile);
};
