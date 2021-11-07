module.exports = async function (user, data) {
  user.username = data.username;
  user.email = data.email;
  user.avatar = data.avatar;
  return user.save();
};
