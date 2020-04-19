const { User, Manga, Subscription } = require("models");

module.exports = async function (user) {
  await Manga.deleteMany({ user: user.id });
  await Subscription.deleteMany({ user: user.id });
  await User.findByIdAndDelete(user.id);
};
