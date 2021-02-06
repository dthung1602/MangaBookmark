#!/usr/bin/env node

/**
 * Generating sprites for src/assets/logosite
 * Output: sitelogo-sprite.png and sitelogo-sprite.css in the same directory
 */
const fs = require("fs");
const Spritesmith = require("spritesmith");

const SPRITE_FILE = "sitelogo-sprite.png";
const CSS_FILE = "sitelogo-sprite.css";

const imagePaths = fs
  .readdirSync(`${__dirname}/src/assets/sitelogo`)
  .filter((f) => !f.includes(SPRITE_FILE) && !f.includes(CSS_FILE))
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

console.log("Generating sprites...");
Spritesmith.run({ src: imagePaths, padding: 1 }, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log("Writing sprite to file...");
    fs.writeFileSync(`${__dirname}/src/assets/sitelogo/${SPRITE_FILE}`, result.image);
    console.log("Writing sprite css...");
    fs.writeFileSync(`${__dirname}/src/assets/sitelogo/${CSS_FILE}`, generateCSS(result.coordinates));
    console.log("Done generating sprites...");
  }
});
