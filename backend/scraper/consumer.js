const { range } = require("lodash");

const MangaService = require("../services/manga-service");
const { getParser } = require("./parsers");
const { Manga } = require("../models");
const { CRAWL_CONCURRENCY, CRAWL_WAIT_TIME } = require("../config");
const { ScheduledQueue, AdhocQueue, ScheduledScrapeResult, AdhocScrapeResult } = require("../services/redis-service");

const wait = async () => new Promise((r) => setTimeout(r, CRAWL_WAIT_TIME));

const Consumer = (queueName, verbose = false) => {
  let queue, scrapeResult, getManga;
  if (queueName === "scheduled") {
    queue = ScheduledQueue;
    scrapeResult = ScheduledScrapeResult;
    getManga = queue.pop;
  } else if (queueName === "adhoc") {
    queue = AdhocQueue;
    scrapeResult = AdhocScrapeResult;
    getManga = queue.bpop;
  } else {
    throw new Error(`Invalid queue name ${queueName}`);
  }

  const consumeManga = async () => {
    try {
      let manga = await getManga();

      if (!manga) {
        return;
      }

      const parser = getParser(manga.link);
      if (parser === null) {
        throw new Error(`Unsupported manga site "${manga.link}"`);
      }
      const crawledManga = await parser.parseManga(manga.link);
      // console.log("CRAWL", manga);

      if (manga._id) {
        manga = new Manga(manga);
        manga.isNew = false;
        manga = await MangaService.update(crawledManga, manga);
      }

      await scrapeResult.push(manga.user, manga);

      if (verbose) {
        console.log(`Updated manga ${manga._id ? manga._id : ""}: ${manga.link}`);
      }
    } catch (e) {
      // todo requeue failed messages
      if (verbose) {
        console.error(`Crawl error: ${e}`);
      }
    }

    await wait();
    return consumeManga();
  };

  return {
    async run() {
      console.log(`Start consuming messages from ${queueName} queue`);

      const promises = range(CRAWL_CONCURRENCY).map(consumeManga);
      await Promise.all(promises);

      console.log(`Done consuming messages`);
    },
  };
};

module.exports = Consumer;
