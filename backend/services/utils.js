const { pick } = require("lodash");

function pickCopy(target, source, props) {
  return Object.assign(target, pick(source, props));
}

/**
 * Ref: https://stackoverflow.com/a/53739792/7342188
 */
function flattenObject(ob) {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) {
      continue;
    }

    if (typeof ob[i] == "object" && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

module.exports = { pickCopy, flattenObject };
