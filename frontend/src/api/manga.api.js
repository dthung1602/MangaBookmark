import BaseAPI, { pollAPI } from "./base.api";
import { ANY } from "../utils/constants";

const ignoreIfAny = ["shelf", "status", "site", "lang", "isCompleted", "hidden"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  get(id) {
    return super.get(null, id);
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
    return super.get({ link }, "info");
  }

  markChapters(mangaId, isRead, chapterLinks) {
    return this.post({ isRead, chapters: chapterLinks }, `${mangaId}/mark-chapters`);
  }

  updateRereadProgress(mangaId, nextRereadChapterLink) {
    return this.post({ nextRereadChapterLink }, `${mangaId}/reread-progress`);
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

  pollUpdateResult() {
    const callAPI = () => super.post({}, "update-multiple/pop-result");
    const finishCondition = async (response) => (await response.json()).status !== "processing";
    return pollAPI(callAPI, finishCondition);
  }
}

export default new MangaAPI();
