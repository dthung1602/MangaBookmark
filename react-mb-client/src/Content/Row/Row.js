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

    onChangeChapter = async (event) => {
        const manga = this.state.manga;
        const chapters = this.state.manga.chapters;
        const newValues = event.target.value;
        let oldValues = chapters.filter(ch => ch.isRead).map(ch => ch._id);

        let chap;
        let action;
        if (newValues.length > oldValues.length) {
            chap = newValues.filter(ch => oldValues.indexOf(ch) === -1)[0];
            action = 'read';
        } else {
            chap = oldValues.filter(ch => newValues.indexOf(ch) === -1)[0];
            action = 'unread';
        }

        try {
            const url = `/api/chapter/${action}/${chap}`;
            const fetchOptions = {
                method: 'POST',
                credentials: "same-origin"
            };
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const text = await response.text();
                alert("ERROR: " + text);
                return
            }
        } catch (e) {
            alert("ERROR: Cannot load data. Check your Internet connection.");
            return;
        }

        chapters.forEach(ch => ch.isRead = newValues.indexOf(ch._id) !== -1);
        this.setState({manga: manga});
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