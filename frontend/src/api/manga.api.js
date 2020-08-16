import BaseAPI from "./base.api";
import { ALL } from "../utils/constants";

const allMeanNoneFields = ["status", "shelf"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  get(params, slug = "") {
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
}

export default new MangaAPI();
