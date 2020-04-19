const { chunk } = require("lodash");
const { CRAWL_MAX_THREADS } = require("../config");
const { update } = require("./update");

module.exports = async function (mangas, verbose = false) {
  if (verbose) {
    console.log(`Start updating ${mangas.length} mangas`);
    console.log(`Using up to ${CRAWL_MAX_THREADS} threads`);
  }

  const chunks = chunk(mangas, CRAWL_MAX_THREADS);
  const successMangas = [];

  for (let i = 0; i < chunks.length; i++) {
    await Promise.all(
      chunks[i].map(async (manga) => {
        try {
          await update(manga);
          successMangas.push(manga);
          if (verbose) {
            console.log(`    Update: '${manga.name}'`);
          }
        } catch (e) {
          console.error(`    Fail to update: '${manga.name}'`);
          if (verbose) {
            console.error(e.toString());
          }
        }
      }),
    );
  }

  return successMangas;
};
