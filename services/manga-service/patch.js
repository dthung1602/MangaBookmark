const { pick } = require("lodash");

const fields = ["following", "note", "isCompleted", "hidden"];

module.exports = async function (manga, data) {
  Object.assign(manga, pick(data, fields));
  return manga.save();
};
