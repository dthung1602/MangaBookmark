const { pick } = require("lodash");

function pickCopy(target, source, props) {
  return Object.assign(target, pick(source, props));
}

module.exports = { pickCopy };
