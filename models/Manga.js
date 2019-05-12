const mongoose = require('mongoose');

let mangaSchema = new mongoose.Schema({
    name: String,
    link: String,
    image: String,

    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },

    following: {
        type: String,
        enum: ['toread', 'following', 'waiting', 'dropped', 'finished'],
        default: 'following'
    },
    note: {
        type: String,
        default: ''
    },
    // genres: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Genre'
    // }]
});

mangaSchema.index({name: 1});
// mangaSchema.index({genres: 1});
mangaSchema.index({link: 1}, {unique: true});

let Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
