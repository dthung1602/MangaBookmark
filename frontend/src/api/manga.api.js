import BaseAPI from "./base.api";

const allMeanNoneFields = ["status", "shelf"];

class MangaAPI extends BaseAPI {
  constructor() {
    super("mangas");
  }

  get(params, slug = "") {
    allMeanNoneFields.forEach((f) => delete params[f]);
    return super.get(params, slug);
  }
}

export default new MangaAPI();
