import fs from "fs/promises";
import crypto from "crypto";
import got from "got";
import { getRandomUserAgent } from "../scraping-service.js";
import { getSiteByName } from "../manga-service/parsers/index.js";
import { getTmpFileName, ensureTmpDirExist } from "../utils/index.js";
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
  await ensureTmpDirExist("cache");
  const key = hash(url);
  const buffer = await response.buffer();
  await fs.writeFile(getTmpFileName("cache", key), buffer);
  const etag = `"${hashImage(buffer)}"`;
  contentTypeMapping.set(key, contentType);
  eTagMapping.set(key, etag);
  return { buffer, contentType, etag };
}
async function getImageFromCache(url) {
  try {
    const key = hash(url);
    const buffer = await fs.readFile(getTmpFileName("cache", key));
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
export { getImage };
export { getEtag };
export default {
  getImage,
  getEtag,
};
