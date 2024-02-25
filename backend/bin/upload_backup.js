#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import * as google from "@googleapis/drive";
import mongoose from "mongoose";

import { NODE_ENV, DB_URL, GOOGLE_AUTH_ID, GOOGLE_AUTH_PASSWORD } from "../config.js";
import { ApplicationMeta } from "../models/index.js";

const BACKUP_DIR = "mangabookmark-backup";
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

async function main() {
  await mongoose.connect(DB_URL);
  const { fileToBackup, allowNewAccessToken } = parseArgs();

  let redirectUrl;
  if (NODE_ENV === "production") {
    redirectUrl = `https://manga--bookmark.appspot.com`;
  } else {
    redirectUrl = "http://localhost:3000/";
  }

  const oAuth2Client = new google.auth.OAuth2(GOOGLE_AUTH_ID, GOOGLE_AUTH_PASSWORD, redirectUrl);
  let token = await getAccessTokenFromMongoDB();
  if (!token) {
    console.log("Token not found");
    if (!allowNewAccessToken) {
      throw Error("Cannot load access token from MongoDB.\n" + "Use --allow-new-access-token to get new token");
    }
    token = await generateNewAccessToken(oAuth2Client);
  }

  oAuth2Client.setCredentials(token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });
  let backupDirId = await getBackupFolderId(drive);
  if (!backupDirId) {
    await createBackupFolder(drive);
    backupDirId = await getBackupFolderId(drive);
    if (!backupDirId) {
      throw Error("Cannot create backup folder");
    }
  }

  console.log(`Using folder id=${backupDirId} to store backup`);
  const fileSize = fs.statSync(fileToBackup).size;
  const fileName = fileToBackup.split("/").pop();
  await drive.files.create(
    {
      requestBody: {
        name: fileName,
        parents: [backupDirId],
      },
      media: {
        mimeType: "application/gzip",
        body: fs.createReadStream(fileToBackup),
      },
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: (evt) => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    },
  );

  console.log("\nDone");
  await mongoose.connection.close();
}

function parseArgs() {
  return {
    fileToBackup: process.argv[2],
    allowNewAccessToken: process.argv[3] === "--allow-new-access-token",
  };
}

async function getAccessTokenFromMongoDB() {
  console.log("Getting access token from mongo db");
  const meta = await ApplicationMeta.findOne({ key: ApplicationMeta.Keys.GOOGLE_OAUTH2_TOKEN });
  if (meta) {
    return JSON.parse(meta.value);
  }
}

async function createAccessTokenInMongoDB(tokens) {
  console.log("Creating access token in mongo db");
  await ApplicationMeta.findOneAndDelete({
    key: ApplicationMeta.Keys.GOOGLE_OAUTH2_TOKEN,
  });
  const meta = new ApplicationMeta({
    key: ApplicationMeta.Keys.GOOGLE_OAUTH2_TOKEN,
    value: JSON.stringify(tokens),
  });
  return meta.save();
}

async function getCodeFromUser() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter code: ", async (code) => {
      rl.close();
      resolve(code);
    });
  });
}

async function generateNewAccessToken(oAuth2Client) {
  console.log("Generating new token");
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const code = await getCodeFromUser();
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Token created");
  await createAccessTokenInMongoDB(tokens);
  return tokens;
}

async function getBackupFolderId(drive) {
  const { data } = await drive.files.list({
    pageSize: 100,
    fields: "nextPageToken, files(id, name)",
  });
  const backupDir = data.files.find((d) => d.name === "mangabookmark-backup");
  if (backupDir) {
    return backupDir.id;
  }
}

async function createBackupFolder(drive) {
  console.log(`Creating backup folder at ${BACKUP_DIR}`);
  await drive.files.create({
    resource: {
      name: BACKUP_DIR,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
