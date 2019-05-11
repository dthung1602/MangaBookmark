import React from "react"
import {withStyles} from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import {Button, Select, TableRow} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Utils from "./Utils"

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
            chapters: props.manga.chapters
        }
    }

    onChange = async (event) => {
        const chapters = this.state.chapters;
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
        this.setState({chapters: this.state.chapters});
    };

    render() {
        const {classes} = this.props;
        const manga = this.props.manga;
        const chapters = this.state.chapters;

        const chapterCount = chapters.length;

        const status = Utils.getMangaStatus(manga);
        const colorClass = {
            'Finished': classes.F,
            'To read': classes.TR,
            'Last chap reached': classes.LCR,
            'New chap': classes.NC
        }[status];

        const readChaptersId = chapters.filter(ch => ch.isRead).map(ch => ch._id);

        let lastChapRead = chapters[chapterCount - 1];
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
                        onChange={this.onChange}
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
                    <Button><a href={nextChapToRead.link}>{nextChapToRead.name}</a></Button>
                    <Button>Drop</Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(Row);