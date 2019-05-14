import React from "react"
import {withStyles} from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import {Badge, Select, TableRow} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/DeleteForever"
import DoneIcon from "@material-ui/icons/Done"
import ReadIcon from "@material-ui/icons/ArrowForwardIos"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"

import Utils from "./Utils"
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
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
    mangaName: {
        color: '#525252',
        fontSize: '130%',
        fontWeight: 900,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#000'
        }
    },
    mangaImg: {
        width: 100
    },

    noWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        whiteSpace: 'nowrap'
    },
    actionBtn: {
        padding: 2,
        margin: '3px 0px 0px 15px',
        borderRadius: 3,
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer',
            background: '#efa230',
            color: '#fff'
        }
    },

    noteBtnGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px 0 15px 0'
    },
    noteTextField: {
        minWidth: 175
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
        this.setState({note: null});
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
        const chapterCount = chapters.length;

        const followingOptions = ['toread', 'following', 'waiting', 'dropped', 'finished'];

        const note = this.state.note;
        const isCompleted = manga.isCompleted;

        const status = Utils.getMangaStatus(manga);
        const colorClass = {
            'Finished': classes.F,
            'Many to read': classes.MTR,
            'Last chap reached': classes.LCR,
            'New chap': classes.NC
        }[status];

        const readChaptersId = chapters.filter(ch => ch.isRead).map(ch => ch._id);
        const numberUnreadChap = chapters.filter(ch => !ch.isRead).length;
        const mangaSource = Utils.getMangaSource(manga.link);

        let lastChapRead = {name: 'xxxx'};
        for (let i = 0; i < chapterCount; i++)
            if (chapters[i].isRead) {
                lastChapRead = chapters[i];
                break;
            }

        // console.log(shortenString(lastChapRead.name));

        let nextChapToRead;
        for (let i = 0; i < chapterCount - 1; i++)
            if (!chapters[i].isRead && chapters[i + 1].isRead) {
                nextChapToRead = chapters[i];
                break;
            }
        if (!chapters[chapterCount - 1].isRead)
            nextChapToRead = chapters[chapterCount - 1];

        return (
            <TableRow>
                <TableCell>
                    <Badge badgeContent={numberUnreadChap} color="error" max={10}>
                        <div className={[colorClass, classes.mangaStatus].join(' ')}>{status}</div>
                    </Badge>
                </TableCell>
                <TableCell>
                    <img src={manga.image} alt='img' className={classes.mangaImg}/>
                </TableCell>
                <TableCell>
                    <div>
                        <a className={classes.mangaName} href={manga.link}>{manga.name}</a>
                    </div>
                    <div>Source: {mangaSource} </div>
                    <div>Total chapters: {chapterCount}</div>
                    <div>Read chapters: {chapterCount - numberUnreadChap}</div>
                </TableCell>
                <TableCell>
                    <div className={classes.noWrap}>
                        <Select
                            multiple
                            value={readChaptersId}
                            onChange={this.onChangeChapter}
                            renderValue={() => <span>{shortenString(lastChapRead.name)}</span>}
                        >
                            {chapters.map(chap => (
                                <MenuItem key={chap._id} value={chap._id}>
                                    <Checkbox checked={chap.isRead}/>
                                    <ListItemText primary={<a href={chap.link}>{chap.name}</a>}/>
                                </MenuItem>
                            ))}
                        </Select>
                        {(nextChapToRead === undefined) ? '' :
                            <div className={classes.actionBtn}
                                 title={"Read " + nextChapToRead.name}
                                 onClick={() => window.open(nextChapToRead.link, '_blank')}>
                                <ReadIcon/>
                            </div>
                        }
                    </div>
                </TableCell>
                <TableCell>
                    <div className={classes.noWrap}>
                        <Select
                            value={manga.following}
                            onChange={this.onChangeFollowing}>
                            {followingOptions.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>

                        {(isCompleted) ? '' :
                            <div className={classes.actionBtn}
                                 title="Mark manga as completed"
                                 onClick={this.onChangeCompleted}>
                                <DoneIcon/>
                            </div>
                        }

                        {/*<Button onClick={this.deleteManga}><DeleteIcon/></Button>*/}
                        <div className={classes.actionBtn}
                             title="Delete manga"
                             onClick={this.deleteManga}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </TableCell>
                {
                    (note === null) ?
                        (<TableCell>
                            <div>
                                {(manga.note === '') ? (<i>Nothing to show</i>) : manga.note}
                            </div>
                            <div className={classes.noteBtnGroup} onClick={this.editNoteClicked}>
                                <EditIcon className={classes.actionBtn} fontSize={"small"}/>
                            </div>
                        </TableCell>) :
                        (<TableCell>
                            <TextField
                                className={classes.noteTextField}
                                value={note}
                                onChange={this.onNoteEdited}
                                multiline
                                rows={2}
                            />
                            <div className={classes.noteBtnGroup}>
                                <SaveIcon className={classes.actionBtn} onClick={this.saveNote}/>
                                <CancelIcon className={classes.actionBtn} onClick={this.cancelEditNote}/>
                            </div>
                        </TableCell>)
                }
            </TableRow>
        )
    }

}

function shortenString(str) {
    const MAX_LENGTH = 20;
    if (str.length <= MAX_LENGTH)
        return str;
    return str.slice(0, MAX_LENGTH) + " ..."
}

export default withStyles(styles)(Row);