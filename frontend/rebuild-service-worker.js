/**
 * Add /api/* to service worker blacklist and inject custom service worker code from custom-service-worker.js
 *
 * Ref: https://stackoverflow.com/a/63344095/7342188
 *      https://stackoverflow.com/a/52841700/7342188
 */
const fs = require("fs");
const serviceWorkerFile = `${__dirname}/build/service-worker.js`;
const customServiceWorkerFile = `${__dirname}/build/custom-service-worker.js`;

console.log("Rebuilding service worker");
let text = fs.readFileSync(serviceWorkerFile).toString();
const start = text.indexOf("blacklist: [");
const end = text.indexOf("\n", start) - 2;

console.log("Injecting blacklist");
const blackListRegex = [/^\/api/];
const blackListString = "," + blackListRegex.map((r) => r.toString()).join(",");
text = text.substring(0, end) + blackListString + text.substring(end);

console.log("Injecting custom service worker");
const customServiceWorkerText = fs.readFileSync(customServiceWorkerFile).toString();
text += "\n" + customServiceWorkerText;

fs.writeFileSync(serviceWorkerFile, text);
fs.unlinkSync(customServiceWorkerFile);
console.log("Done");
