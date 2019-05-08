const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
