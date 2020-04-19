module.exports = async function (user, data) {
  user.username = data.username;
  user.email = data.email;
  return user.save();
};
