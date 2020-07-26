module.exports = async function (user, password) {
  user.password = password;
  return user.save();
};
