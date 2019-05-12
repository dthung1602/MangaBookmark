import React from "react"
import {withStyles} from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import {Button, Select, TableRow} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import Utils from "./Utils"
import Textarea from "@material-ui/core/es/InputBase/Textarea";

const styles = theme => ({
    F: {
        background: 'grey',
    },
    TR: {
        background: 'yellow',
    },
    LCR: {
        background: 'white',
    },
    NC: {
        background: 'green',
    },

    mangaImg: {
        width: 100
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

    saveNote = async () => {
        const manga = this.state.manga;
        const note = this.state.note;

        try {
            await this.props.onEditManga(manga._id, {note: note});
            manga.note = note;
            this.setState({manga: manga, note: null});
        } catch (e) {
            alert('ERROR: ' + e);
        }
    };

    onNoteEdited = (event) => {
        this.setState({note: event.target.value})
    };

    editNoteClicked = () => {
        this.setState({note: this.state.manga.note})
    };

    cancelEditNote = () => {
        this.setState({note: null})
    };

    deleteManga = () => {
        if (!window.confirm('Are you sure to delete this manga?'))
            return;
        this.props.onDeleteManga(this.state.manga._id)
    };

    onChangeCompleted = async () => {
        const manga = this.state.manga;

        try {
            await this.props.onEditManga(manga._id, {completed: true});
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
        const chapterCount = chapters.length;

        const followingOptions = ['toread', 'following', 'waiting', 'dropped', 'finished'];

        const note = this.state.note;
        const isCompleted = manga.isCompleted;

        const status = Utils.getMangaStatus(manga);
        const colorClass = {
            'Finished': classes.F,
            'To read': classes.TR,
            'Last chap reached': classes.LCR,
            'New chap': classes.NC
        }[status];

        const readChaptersId = chapters.filter(ch => ch.isRead).map(ch => ch._id);

        let lastChapRead = chapters[0];
        let nextChapToRead = chapters[chapterCount - 1];
        if (!manga.isCompleted) {
            for (let i = chapterCount - 2; i >= 0; i--)
                if (!chapters[i].isRead && chapters[i + 1].isRead) {
                    lastChapRead = chapters[i + 1];
                    nextChapToRead = chapters[i];
                }
        }

        return (
            <TableRow>
                <TableCell className={colorClass}>
                    {status}
                </TableCell>
                <TableCell>
                    <img src={manga.image} alt={manga.name} className={classes.mangaImg}/>
                    <a href={manga.link}>{manga.name}</a>
                </TableCell>
                <TableCell>
                    <Select
                        multiple
                        value={readChaptersId}
                        onChange={this.onChangeChapter}
                        renderValue={() => <span>{lastChapRead.name}</span>}
                    >
                        {chapters.map(chap => (
                            <MenuItem key={chap._id} value={chap._id}>
                                <Checkbox checked={chap.isRead}/>
                                <ListItemText primary={<a href={chap.link}>{chap.name}</a>}/>
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
                <TableCell>
                    <Select
                        value={manga.following}
                        onChange={this.onChangeFollowing}
                    >
                        {followingOptions.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button><a href={nextChapToRead.link}>Read</a></Button>
                    {(isCompleted) ? '' :
                        <Button onClick={this.onChangeCompleted}>Mark completed</Button>
                    }
                    <Button onClick={this.deleteManga}>Delete</Button>
                </TableCell>
                {
                    (note === null) ?
                        (<TableCell>
                            <div> {manga.note} </div>
                            <Button onClick={this.editNoteClicked}> Edit </Button>
                        </TableCell>) :
                        (<TableCell>
                            <Textarea value={note} onChange={this.onNoteEdited} variant='outlined'/>
                            <Button onClick={this.cancelEditNote}> Cancel </Button>
                            <Button onClick={this.saveNote}> Save </Button>
                        </TableCell>)
                }
            </TableRow>
        )
    }
}

export default withStyles(styles)(Row);