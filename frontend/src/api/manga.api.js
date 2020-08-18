import BaseAPI from "./base.api";
import { ALL } from "../utils/constants";

const allMeanNoneFields = ["status", "shelf", "site"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  find(params, slug = "") {
    for (let f of allMeanNoneFields) {
      if (params[f] === ALL) {
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
}

export default new MangaAPI();
