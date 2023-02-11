import { getSearcher } from "./searchers/index.js";

export default async function (site, term, topN = 3) {
  const searcher = getSearcher(site);
  return (await searcher.search(term, topN)).slice(0, topN);
}
