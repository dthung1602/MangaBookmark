import BaseAPI from "./base.api";

class OmniSearchAPI extends BaseAPI {
  constructor() {
    super("omnisearch");
  }

  searchUserManga(term, topN = 3) {
    return super.get({ search: term, topN }, "user-manga");
  }

  searchScanlationSites(term, topN = 3, sites = undefined) {
    return super.get({ search: term, topN, sites }, "scanlation-manga");
  }
}

export default new OmniSearchAPI();
