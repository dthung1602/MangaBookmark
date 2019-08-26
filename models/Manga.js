const mongoose = require('mongoose');

function getMangaStatusCode(manga) {
    const allRead = manga.chapters.every(ch => ch.isRead);

    if (manga.isCompleted)
        if (allRead)
            return 0;
        else
            return 2;

    else if (allRead)
        return 1;
    else
        return 3;
}

function codeToStatus(code) {
    return ['Finished', 'Last chap reached', 'Many to read', 'New chap'][code];
}

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

        statusCode: Number,
        following: {
            type: String,
            enum: ['toread', 'following', 'waiting', 'dropped', 'finished'],
            default: 'following'
        },

        note: {
            type: String,
            default: ''
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.statusCode;
                ret.status = doc.status;
            }
        }
    }
);

mangaSchema.index({name: 'text'});
mangaSchema.index({user: 1, following: 1, hidden: 1});
mangaSchema.index({user: 1, link: 1}, {unique: true});

mangaSchema.pre('save', function (next) {
    this.statusCode = getMangaStatusCode(this);
    next();
});

mangaSchema.virtual('status').get(function () {
    return codeToStatus(this.statusCode)
});

let Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
