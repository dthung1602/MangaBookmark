#!/usr/bin/env node

/**
 Migrate from version 3.0.2 to version 3.1.0
 */

const mongoose = require("mongoose");

const User = require("../models/User");
const { DB_URL } = require("../config");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

async function main() {
  console.log("Connecting to database");
  await mongoose.connect(DB_URL);

  const users = await User.find();
  for (let user of users) {
    user.avatar = user.googlePic || user.facebookPic || "https://picsum.photos/100";
  }
  await Promise.all(users.map((user) => user.save()));

  console.log("Update users done!");

  mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  mongoose.connection.close();
  process.exit(1);
});
