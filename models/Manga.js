const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
    {
        name: String,
        link: String,
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);


const mangaSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        name: String,
        link: String,
        image: String,

        chapters: [chapterSchema],
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
        }
    },
    {
        timestamps: true
    }
);

mangaSchema.index({name: 'text'});
mangaSchema.index({user: 1, following: 1});
mangaSchema.index({user: 1, link: 1}, {unique: true});

let Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
