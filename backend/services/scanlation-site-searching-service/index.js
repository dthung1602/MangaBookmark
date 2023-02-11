import { supportedSites, getSearcher } from "./searchers/index.js";
import searchOneSite from "./search-one-site.js";
import searchMultipleSites from "./search-multiple-sites.js";

export { searchOneSite, searchMultipleSites, supportedSites, getSearcher };

export default {
  searchOneSite,
  searchMultipleSites,
  supportedSites,
  getSearcher,
};
