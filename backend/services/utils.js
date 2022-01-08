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

// const compareByKey = (a, b, key) => {
//   let desc = false;
//   if (key[0] === "-") {
//     desc = true;
//     key = key.slice(1);
//   }
//   if (a[key] > b[key]) {
//     return desc ? -1 : 1;
//   }
//   if (a[key] < b[key]) {
//     return desc ? 1 : -1;
//   }
//   return 0;
// };
//
// const createCompareFunc = (sort) => (a, b) => {
//   for (const key of sort) {
//     const compareResult = compareByKey(a, b, key);
//     if (compareResult !== 0) {
//       return compareResult;
//     }
//   }
//   return 0;
// };

// function applyPagination(data, page, perPage) {
//   // data = data.sort(createCompareFunc(sort));
//   const chunks = perPage === 0 ? data : chunk(data, perPage);
//   return {
//     data: chunks[page - 1],
//     page,
//     totalItem: data.length,
//     totalPage: chunks.length,
//     isLastPage: page === chunks.length,
//   };
// }

function ensureIsArray(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  }
  return [maybeArray];
}

function trimExtra(string) {
  return string.replace(/  +/g, " ").trim();
}

function normalizeURL(url) {
  return new URL(url).toString();
}

function normalizeDate(date) {
  if (date instanceof Date) {
    return date.toString();
  }
  return new Date(Date.parse(trimExtra(date))).toISOString();
}

function parseBoolean(value) {
  const normalizedValue = value.toString().toLowerCase().trim();
  if (normalizedValue === "true") {
    return true;
  }
  if (normalizedValue === "false") {
    return false;
  }
  throw new Error("Invalid boolean value");
}

module.exports = { pickCopy, flattenObject, ensureIsArray, trimExtra, normalizeURL, normalizeDate, parseBoolean };
