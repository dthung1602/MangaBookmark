import parseManga from "./parsers/index.js";
import delete_ from "./delete.js";

import create from "./create.js";
import get from "./get.js";
import list from "./list.js";
import patch from "./patch.js";
import update from "./update.js";
import getInfo from "./get-info.js";
import updateMultiple from "./update-multiple.js";
import markChapters from "./mark-chapters.js";
import updateRereadProgress from "./update-reread-progress.js";
import parsers from "./parsers/index.js";

export {
  create,
  get,
  list,
  patch,
  update,
  delete_ as delete,
  getInfo,
  updateMultiple,
  parseManga,
  markChapters,
  updateRereadProgress,
  parsers,
};

export default {
  create,
  get,
  list,
  patch,
  update,
  delete: delete_,
  getInfo,
  updateMultiple,
  parseManga,
  markChapters,
  updateRereadProgress,
  parsers,
};
