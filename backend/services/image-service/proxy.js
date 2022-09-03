const fs = require("fs/promises");
const crypto = require("crypto");
const got = require("got");

const { getRandomUserAgent } = require("../scraping-service");
const { getSiteByName } = require("../manga-service/parsers");

const CACHE_DIR = "/tmp/mangabookmark/cache";
const SUPPORTED_FORMAT = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ETAG_HASH_HEAD_TAIL_SIZE = 2048;

/**
 * Fetch the image from the internet with spoofed referer
 */
function fetchImage(url, mangaSite) {
  const headers = {
    "User-Agent": getRandomUserAgent(),
    "Accept-Language": "en",
    "Accept-Encoding": "gzip, deflate",
    Accept: "image/webp,*/*",
  };
  const referer = getSiteByName(mangaSite)?.homepage;
  if (referer) {
    headers.Referer = referer;
  }
  return got(url, { headers });
}

function hash(string) {
  return crypto.createHash("md5").update(string).digest("hex");
}

function hashImage(buffer) {
  return hash(
    Buffer.concat([buffer.slice(0, ETAG_HASH_HEAD_TAIL_SIZE), buffer.slice(buffer.length - ETAG_HASH_HEAD_TAIL_SIZE)]),
  );
}

const contentTypeMapping = new Map();
const eTagMapping = new Map();

async function cacheImage(response) {
  const { url, headers } = await response;
  const contentType = headers["content-type"];

  if (!SUPPORTED_FORMAT.includes(contentType)) {
    throw Error("Unsupported image format");
  }

  try {
    await fs.access(CACHE_DIR);
  } catch {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }

  const key = hash(url);
  const buffer = await response.buffer();
  await fs.writeFile(`${CACHE_DIR}/${key}`, buffer);

  const etag = `"${hashImage(buffer)}"`;
  contentTypeMapping.set(key, contentType);
  eTagMapping.set(key, etag);

  return { buffer, contentType, etag };
}

async function getImageFromCache(url) {
  try {
    const key = hash(url);
    const buffer = await fs.readFile(`${CACHE_DIR}/${key}`);
    const contentType = contentTypeMapping.get(key);
    const etag = eTagMapping.get(key);
    return { buffer, contentType, etag };
  } catch {
    return null;
  }
}

async function getImage(url, mangaSite) {
  let image = await getImageFromCache(url);
  if (image === null) {
    const response = fetchImage(url, mangaSite);
    image = await cacheImage(response);
  }
  return image;
}

function getEtag(url) {
  return eTagMapping.get(hash(url));
}

module.exports = { getImage, getEtag };
