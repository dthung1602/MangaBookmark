#!/usr/bin/env node

/**
 * Generating sprites for src/assets/logosite
 * Output: sitelogo-sprite.png and sitelogo-sprite.css in the same directory
 */
const fs = require("fs");
const Spritesmith = require("spritesmith");
const { execSync } = require("child_process");

const PNG_SPRITE_FILE_NAME = "sitelogo-sprite.png";
const CSS_FILE_NAME = "sitelogo-sprite.css";
const PNG_SPRITE_PATH = `${__dirname}/src/assets/sitelogo/${PNG_SPRITE_FILE_NAME}`;
const CSS_PATH = `${__dirname}/src/assets/sitelogo/${CSS_FILE_NAME}`;

const imagePaths = fs
  .readdirSync(`${__dirname}/src/assets/sitelogo`)
  .filter((f) => !f.includes(PNG_SPRITE_FILE_NAME) && !f.includes(CSS_FILE_NAME))
  .map((f) => `${__dirname}/src/assets/sitelogo/${f}`);

const getSiteFromImageFilePath = (fullPath) => {
  return fullPath.split("/").pop().split(".").shift().toLowerCase();
};

const generateCSS = (coordinates) => {
  let css = "";
  for (let [imagePath, { x, y, width, height }] of Object.entries(coordinates)) {
    const className = getSiteFromImageFilePath(imagePath);
    css += `.${className}-logo { 
              background-position: ${-x}px ${-y}px;
              width: ${width}px;
              height: ${height}px; 
           }\n`;
  }
  return css.replace(/ 0px/g, " 0");
};

const secret = process.env["CONVERT_API_SECRET"];
const WEBP_SPRINT_PATH = PNG_SPRITE_PATH.replace(".png", ".webp");
const convertToWebpCmd = `curl -s -F "File=@${PNG_SPRITE_PATH}" https://v2.convertapi.com/convert/png/to/webp?Secret=${secret} > ${WEBP_SPRINT_PATH}`;
console.log(convertToWebpCmd);

const convertToWebp = () => {
  execSync(convertToWebpCmd);
  const fileData = JSON.parse(fs.readFileSync(WEBP_SPRINT_PATH)).Files[0].FileData;
  const buff = new Buffer(fileData, "base64");
  fs.writeFileSync(WEBP_SPRINT_PATH, buff);
};

console.log("Generating sprites...");
Spritesmith.run({ src: imagePaths, padding: 1 }, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log("Writing sprite to file...");
    fs.writeFileSync(PNG_SPRITE_PATH, result.image);
    console.log("Converting to webp...");
    convertToWebp();
    console.log("Writing sprite css...");
    fs.writeFileSync(CSS_PATH, generateCSS(result.coordinates));
    console.log("Done generating sprites...");
  }
});
