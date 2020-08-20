import BaseAPI from "./base.api";
import { ANY } from "../utils/constants";

const ignoreIfAny = ["shelf", "status", "site", "isCompleted", "hidden"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  find(params, slug = "") {
    for (let f of ignoreIfAny) {
      if (params[f] === ANY) {
        delete params[f];
      }
    }
    return super.get(params, slug);
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
}

export default new MangaAPI();
