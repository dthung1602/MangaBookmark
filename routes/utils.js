const {connectToDB, Manga} = require('../models');

function checkPermission(req, res, next) {
    connectToDB(next);

    const mangaID = req.body.manga;
    const userID = req.user.id;

    Manga.findById(mangaID)
        .then((manga) => {
            if (manga === null) {
                res.status(400).send('Invalid manga id');
                return;
            }

            if (manga.user.toString() !== userID) {
                res.status(403).send('You do not have permission to modify these chapters');
                return;
            }

            req.manga = manga;
            next();
        })
        .catch(next);
}

function redirectHome(req, res) {
    res.redirect('/');
}

module.exports = {checkPermission, redirectHome};