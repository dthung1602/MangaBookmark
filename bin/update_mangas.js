#!/usr/bin/env node

const mongoose = require('mongoose');
const {updateChapters} = require('../crawl/runner');
const {Manga} = require('../models');
const {CRAWL_MAX_THREADS, DB_URL} = require('../config');

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
        })
        .populate('chapters');
    const chunks = chunkArray(mangasToUpdate, CRAWL_MAX_THREADS);

    console.log(`Start updating ${mangasToUpdate.length} mangas`);
    for (let i = 0; i < chunks.length; i++)
        await Promise.all(chunks[i].map(async manga => {
            await updateChapters(manga);
            console.log(`    - Update: '${manga.name}'`);
        }));

    console.log('\nDone!');
    mongoose.connection.close();
}

main().catch(err => {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
});
