const { chunk } = require("lodash");

const { CRAWL_CONCURRENCY } = require("../../config");
const update = require("./update");

module.exports = async function (mangas, additionalUpdate = false, verbose = false) {
  if (verbose) {
    console.log(`Start updating ${mangas.length} mangas`);
    console.log(`Concurrency: ${CRAWL_CONCURRENCY}`);
  }

  const chunks = chunk(mangas, CRAWL_CONCURRENCY);
  const successMangas = [];
  const failMangas = [];

  for (let i = 0; i < chunks.length; i++) {
    await Promise.all(
      chunks[i].map(async (manga) => {
        try {
          await update(manga, additionalUpdate);
          successMangas.push(manga);
          if (verbose) {
            console.log(`    Update: '${manga.name}'`);
          }
        } catch (e) {
          failMangas.push(manga);
          console.error(`    Fail to update: '${manga.name}'`);
          if (verbose) {
            console.error(e.toString());
          }
        }
      }),
    );
  }

  return { successMangas, failMangas };
};
