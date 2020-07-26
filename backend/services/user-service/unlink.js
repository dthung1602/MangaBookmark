module.exports = async function (user, provider, newPrimaryAccount) {
  user[provider + "Id"] = null;
  user[provider + "Name"] = null;
  user[provider + "Pic"] = null;
  user.primaryAccount = newPrimaryAccount;
  await user.save();
  return user;
};
