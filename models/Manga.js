const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let mangaSchema = new mongoose.Schema({
    name: String,
    image: Buffer,

    source: {
        type: String,
        enum: ['MR', 'HVTT', 'MKL', 'NT']
    },
    code: String,

    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    }],
    currentChap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    latestChap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    finalChap: mongoose.Schema.Types.Mixed,

    note: String,
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

mangaSchema.index({name: 1});
mangaSchema.index({genres: 1});

let Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
