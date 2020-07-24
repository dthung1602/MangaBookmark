const { pick } = require("lodash");

const { Manga } = require("../../models");
const fields = ["following", "note", "isCompleted", "hidden"];

module.exports = async function (manga, data) {
  Object.assign(manga, pick(data, fields));
  if (manga.following === Manga.FollowingStatuses.FINISHED) {
    manga.chapters.forEach((ch) => (ch.isRead = true));
  }
  return manga.save();
};
