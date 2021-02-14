#!/usr/bin/env node

/**
 * Generating sprites
 */
const fs = require("fs");
const Spritesmith = require("spritesmith");
const { execSync } = require("child_process");

const getImagesPathFromDir = (dirPath, exclude) => {
  const dirName = dirPath.split("/").pop();
  exclude = [...exclude, dirName + ".png", dirName + ".webp"];
  return fs
    .readdirSync(`${__dirname}/${dirPath}`)
    .filter((f) => f.endsWith(".png") && !exclude.includes(f))
    .map((f) => `${__dirname}/${dirPath}/${f}`);
};

const getClassNameFromImageFilePath = (fullPath) => {
  return "img-" + fullPath.split("/").pop().split(".").shift().toLowerCase();
};

const generateCSS = (coordinates) => {
  let css = "";
  for (let [imagePath, { x, y, width, height }] of Object.entries(coordinates)) {
    const className = getClassNameFromImageFilePath(imagePath);
    css += `.${className} { 
              background-position: ${-x}px ${-y}px;
              width: ${width}px;
              height: ${height}px; 
           }\n`;
  }
  return css.replace(/ 0px/g, " 0");
};

const convertToWebp = (pngSpritePath) => {
  const secret = process.env["CONVERT_API_SECRET"];
  const webpSpritePath = pngSpritePath.replace(".png", ".webp");
  const convertToWebpCmd = `curl -s -F "File=@${pngSpritePath}" https://v2.convertapi.com/convert/png/to/webp?Secret=${secret} > ${webpSpritePath}`;
  execSync(convertToWebpCmd);
  const data = JSON.parse(fs.readFileSync(webpSpritePath).toString());
  if (data.hasOwnProperty("Message")) {
    throw data.Message;
  }
  const buff = Buffer.from(data.Files[0].FileData, "base64");
  fs.writeFileSync(webpSpritePath, buff);
  fs.unlinkSync(pngSpritePath);
};

const SPRITES = [
  {
    dir: "src/assets/manga-site-logo",
    exclude: [],
  },
  {
    dir: "src/assets/tech-logo",
    exclude: ["logo.png", "logo-invert.png"],
  },
];

for (let { dir, exclude } of SPRITES) {
  console.log(`> Generating sprites for ${dir}`);
  const imagePaths = getImagesPathFromDir(dir, exclude);

  Spritesmith.run({ src: imagePaths, padding: 1 }, function (err, result) {
    if (err) {
      console.error(err);
    } else {
      const pngSpritePath = dir + "/" + dir.split("/").pop() + ".png";
      const cssPath = pngSpritePath.replace(".png", ".css");

      console.log(` - Writing PNG sprite to ${pngSpritePath}`);
      fs.writeFileSync(pngSpritePath, result.image);

      console.log(` - Converting ${pngSpritePath} to WEBP`);
      convertToWebp(pngSpritePath);

      console.log(` - Writing CSS to ${cssPath}`);
      fs.writeFileSync(cssPath, generateCSS(result.coordinates));
    }
  });
}
