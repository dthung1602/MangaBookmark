import React from "react"

import {Badge, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell/index";
import {withStyles} from "@material-ui/styles";

import ChapterList from "./ChapterList";
import MangaActions from "./MangaActions";
import MangaNote from "./MangaNote";
import utils from "../../utils"
import MangaInfoCell from "./MangaInfoCell";

const styles = () => ({
    F: {
        color: '#999999'
    },
    MTR: {
        color: '#efa230'
    },
    LCR: {
        color: 'rgba(37,68,111,0.95)'
    },
    NC: {
        color: '#07853a'
    },

    mangaStatus: {
        margin: '5px 12px',
        fontWeight: 900,
        fontSize: '120%',
        textTransform: 'capitalize'
    },

    mangaImg: {
        width: 100,
        minHeight: 100
    }
});

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manga: props.manga,
            note: null
        }
    }

    markChapterReadStatus = (chapters, action) => {
        if (chapters.length === 0) return;
        const url = `/api/chapter/${action}`;
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({chapters: chapters})
        };
        return fetch(url, fetchOptions);
    };

    onChangeChapter = async (event) => {
        const {manga} = this.state;
        const {chapters} = manga;
        const newValues = event.target.value;
        let oldValues = chapters.filter(ch => ch.isRead).map(ch => ch._id);
        console.log(newValues);
        console.log(oldValues);
        const markRead = utils.minusArray(newValues, oldValues);
        const markUnread = utils.minusArray(oldValues, newValues);
        console.log(markRead);
        console.log(markUnread);
        try {
            await Promise.all([
                this.markChapterReadStatus(markRead, 'read'),
                this.markChapterReadStatus(markUnread, 'unread')
            ]);

            chapters.forEach(chap => chap.isRead = newValues.indexOf(chap._id) > -1);
            this.setState({manga: manga});

        } catch (e) {
            alert('ERROR ' + e);
        }
    };

    onMarkAllChaptersRead = async () => {
        const {manga} = this.props;
        const {chapters} = manga;
        const markRead = chapters.filter(ch => !ch.isRead).map(ch => ch._id);
        try {
            await this.markChapterReadStatus(markRead, 'read');
            chapters.forEach(ch => ch.isRead = true);
            this.setState({manga: manga})
        } catch (e) {
            alert('ERROR ' + e);
        }
    };

    saveNote = async (note) => {
        const manga = this.state.manga;

        try {
            await this.props.onEditManga(manga._id, {note: note});
            manga.note = note;
            this.setState({manga: manga, note: null});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    deleteManga = () => {
        if (!window.confirm('Are you sure to delete this manga?'))
            return;
        this.props.onDeleteManga(this.state.manga._id)
    };

    onChangeCompleted = async () => {
        const manga = this.state.manga;

        try {
            await this.props.onEditManga(manga._id, {isCompleted: true});
            manga.isCompleted = true;
            this.setState({manga: manga});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    onChangeFollowing = async (event) => {
        const manga = this.state.manga;
        const following = event.target.value;

        try {
            await this.props.onEditManga(manga._id, {following: following});
            manga.following = following;
            this.setState({manga: manga});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    render() {
        const {classes} = this.props;
        const manga = this.state.manga;
        const chapters = manga.chapters;

        const status = utils.getMangaStatus(manga);
        const colorClass = {
            'Finished': classes.F,
            'Many to read': classes.MTR,
            'Last chap reached': classes.LCR,
            'New chap': classes.NC
        }[status];

        const numberUnreadChap = chapters.filter(ch => !ch.isRead).length;

        return (
            <TableRow>

                <TableCell>
                    <Badge badgeContent={numberUnreadChap} color="error" max={10}>
                        <div className={[colorClass, classes.mangaStatus].join(' ')}>{status}</div>
                    </Badge>
                </TableCell>

                <TableCell>
                    <div className={classes.mangaImg}>
                        <img src={manga.image} alt='img' className={classes.mangaImg}/>
                    </div>
                </TableCell>

                <TableCell>
                    <MangaInfoCell manga={manga}/>
                </TableCell>

                <TableCell>
                    <ChapterList
                        chapters={chapters}
                        onChangeChapter={this.onChangeChapter}
                    />
                </TableCell>

                <TableCell>
                    <MangaActions
                        manga={manga}
                        onMarkAllChaptersRead={this.onMarkAllChaptersRead}
                        onChangeCompleted={this.onChangeCompleted}
                        onChangeFollowing={this.onChangeFollowing}
                        deleteManga={this.deleteManga}
                    />
                </TableCell>

                <TableCell>
                    <MangaNote
                        mangaNote={manga.note}
                        saveNote={this.saveNote}
                    />
                </TableCell>

            </TableRow>
        )
    }

}

export default withStyles(styles)(Row);