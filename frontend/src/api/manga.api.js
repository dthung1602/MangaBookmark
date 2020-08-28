import BaseAPI from "./base.api";
import { ANY } from "../utils/constants";

const ignoreIfAny = ["shelf", "status", "site", "isCompleted", "hidden"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  find(params) {
    for (let f of ignoreIfAny) {
      if (params[f] === ANY) {
        delete params[f];
      }
    }
    return super.get(params);
  }

  info(link) {
    return this.get({ link }, "info");
  }

  getSupportedSites() {
    return this.get({}, "supported-sites");
  }

  markChapters(mangaId, isRead, chapterLinks) {
    return this.post({ isRead, chapters: chapterLinks }, `${mangaId}/mark-chapters`);
  }

  update(mangaId) {
    return this.post({}, `${mangaId}/update`);
  }

  updateMultiple(params) {
    for (let f of ignoreIfAny) {
      if (params[f] === ANY) {
        delete params[f];
      }
    }
    return super.post(params, "update-multiple");
  }
}

export default new MangaAPI();
