const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let chapterSchema = new mongoose.Schema(
    {
        manga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        },
        name: String,

        no: Number,
        next: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter'
        },
        prev: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chapter'
        },
    },
    {
        timestamps: {
            createAt: 'lastUpdated',
            updatedAt: 'readAt'
        }
    }
);

chapterSchema.index({'manga': 1});
chapterSchema.index({'lastUpdated': 1});

var Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
