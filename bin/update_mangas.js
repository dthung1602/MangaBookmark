#!/usr/bin/env node

const mongoose = require('mongoose');
const {updateMangas} = require('../crawl/runner');
const {Manga} = require('../models');
const {DB_URL} = require('../config');

function chunkArray(array, chunkSize) {
    const tempArray = [];

    for (let index = 0; index < array.length; index += chunkSize)
        tempArray.push(array.slice(index, index + chunkSize));

    return tempArray;
}

async function main() {
    console.log('Connecting to database');
    await mongoose.connect(DB_URL);

    console.log('Fetching mangas to update');
    const mangasToUpdate = await Manga
        .find({
            following: {$in: ['toread', 'following', 'waiting']},
            isCompleted: false
        });

    await updateMangas(mangasToUpdate, true);

    console.log('Update manga done!');
    mongoose.connection.close();
}

main().catch(err => {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
});

