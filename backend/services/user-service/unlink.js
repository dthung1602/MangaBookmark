module.exports = async function (user, provider) {
  user[provider + "Id"] = null;
  user[provider + "Name"] = null;
  user[provider + "Pic"] = null;
  return await user.save();
};
