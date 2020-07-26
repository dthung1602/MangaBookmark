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
            updatingManga: false,
            manga: props.manga,
            note: null
        }
    }

    markChapterReadStatus = async (chapters, action) => {
        const mangaID = this.state.manga._id;

        if (chapters.length === 0) return;
        const url = `/api/chapter/${action}`;
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                manga: mangaID,
                chapters: chapters
            })
        };

        const response = await fetch(url, fetchOptions);
        if (!response.ok)
            throw new Error(await response.text())
    };

    markChaptersAsRead = async (links) => {
        const {manga} = this.state;
        const {chapters} = manga;

        let oldValues = chapters.filter(ch => ch.isRead).map(ch => ch.link);

        const markRead = utils.minusArray(links, oldValues);
        const markUnread = utils.minusArray(oldValues, links);

        try {
            await Promise.all([
                this.markChapterReadStatus(markRead, 'read'),
                this.markChapterReadStatus(markUnread, 'unread')
            ]);

            chapters.forEach(chap => chap.isRead = links.indexOf(chap.link) > -1);
            manga.status = utils.getMangaStatus(manga);
            this.setState({manga: manga});

        } catch (e) {
            alert('ERROR ' + e);
        }
    };

    onChangeChapter = async (event) => {
        await this.markChaptersAsRead(event.target.value)
    };

    onMarkChaptersAsReadUpTo = async (upTo) => {
        const links = this.state.manga.chapters
            .map((ch, i) => (i >= upTo) ? ch.link : null) // get links of chapters with i >= upTo
            .filter(link => link !== null); // remove null

        await this.markChaptersAsRead(links);
    };

    onMarkAllChaptersRead = async () => {
        const {manga} = this.state;
        const {chapters} = manga;
        const markRead = chapters.filter(ch => !ch.isRead).map(ch => ch.link);
        try {
            await this.markChapterReadStatus(markRead, 'read');
            chapters.forEach(ch => ch.isRead = true);
            manga.status = utils.getMangaStatus(manga);
            this.setState({manga: manga})
        } catch (e) {
            alert('ERROR ' + e);
        }
    };

    saveNote = async (note) => {
        const {manga} = this.state;

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
        const {manga} = this.state;

        try {
            await this.props.onEditManga(manga._id, {isCompleted: true});
            manga.isCompleted = true;
            manga.status = utils.getMangaStatus(manga);
            this.setState({manga: manga});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    onChangeFollowing = async (event) => {
        const {manga} = this.state;
        const following = event.target.value;

        try {
            await this.props.onEditManga(manga._id, {following: following});
            manga.following = following;
            this.setState({manga: manga});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    onChangeVisibility = async () => {
        const {manga} = this.state;
        const hidden = !manga.hidden;

        try {
            await this.props.onEditManga(manga._id, {hidden: hidden});
            manga.hidden = hidden;
            this.setState({manga: manga});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    updateManga = async () => {
        this.setState({updatingManga: true});

        let {manga} = this.state;

        const url = `/api/manga/update`;
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'manga': manga._id})
        };

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            this.setState({updatingManga: false});
            alert('ERROR ' + await response.text());
            return
        }

        this.setState({
            manga: await response.json(),
            updatingManga: false
        });
        alert(`Manga "${manga.name}" updated successfully!`);
    };

    render() {
        const {classes, showHidden} = this.props;
        const {manga, updatingManga} = this.state;
        const chapters = manga.chapters;

        const {status} = manga;
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
                        onMarkUpTo={this.onMarkChaptersAsReadUpTo}
                        onMarkAllChaptersRead={this.onMarkAllChaptersRead}
                        showNextChapBtn={true}
                        markAllRead='after'
                    />
                </TableCell>

                <TableCell>
                    <MangaActions
                        updatingManga={updatingManga}
                        manga={manga}
                        showHidden={showHidden}
                        onChangeCompleted={this.onChangeCompleted}
                        onChangeFollowing={this.onChangeFollowing}
                        onChangeVisibility={this.onChangeVisibility}
                        updateManga={this.updateManga}
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