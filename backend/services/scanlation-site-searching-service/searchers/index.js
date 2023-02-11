import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const excludedFiles = new Set(["index.js"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const searchers = {};
const supportedSites = [];

fs.readdirSync(__dirname)
  .filter((file) => !excludedFiles.has(file))
  .forEach(async (file) => {
    const searcherModule = (await import("./" + file)).default;
    searchers[searcherModule.site] = searcherModule;
    supportedSites.push(searcherModule.site);
  });

function getSearcher(site) {
  const searcher = searchers[site];
  if (searcher) {
    return searcher;
  }
  throw new Error("Unsupported searching for site " + site);
}

export { getSearcher, supportedSites };
export default {
  getSearcher,
  supportedSites,
};
