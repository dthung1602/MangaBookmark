const { pick } = require("lodash");

function pickCopy(target, source, props) {
  Object.assign(target, pick(source, props));
}

module.exports = { pickCopy };
