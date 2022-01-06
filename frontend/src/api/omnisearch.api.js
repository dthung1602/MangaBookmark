import BaseAPI from "./base.api";

const formatFakeResult = (object, timeout = 3000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(new Response(new Blob([JSON.stringify(object)]))), timeout);
  });

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

  searchMAL() {
    return {
      result: formatFakeResult(malData),
      abort: () => {},
    };
  }
}

const malData = {
  data: [],
};

export default new OmniSearchAPI();
