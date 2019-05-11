const mongoose = require('mongoose');

let chapterSchema = new mongoose.Schema(
    {
        name: String,
        link: String,
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createAt: 'lastUpdated',
            updatedAt: 'readAt'
        }
    }
);

chapterSchema.index({link: 1}, {unique: true});

let Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
