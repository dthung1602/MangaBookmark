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
            manga: props.manga
        }
    }

    render() {
        const {classes} = this.props;
        const manga = this.state.manga;

        const chapterCount = manga.chapters.length;

        const status = Utils.getMangaStatus(manga);
        const colorClass = {
            'Finished': classes.F,
            'To read': classes.TR,
            'Last chap reached': classes.LCR,
            'New chap': classes.NC
        }[status];

        const readChapters = manga.chapters.filter(ch => ch.isRead);

        let lastChapRead = manga.chapters[chapterCount - 1];
        let nextChapToRead =manga.chapters[chapterCount - 1];
        if (!manga.isCompleted) {
            for (let i = chapterCount - 2; i >= 0; i--)
                if (!manga.chapters[i].isRead && manga.chapters[i + 1].isRead) {
                    lastChapRead = manga.chapters[i + 1];
                    nextChapToRead = manga.chapters[i];
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
                        value={readChapters}
                        // onChange={ /*TODO */}
                        // input={<Input id="select-multiple-checkbox"/>}
                        renderValue={() => <span>{lastChapRead.name}</span>}
                        // MenuProps={MenuProps}
                    >
                        {manga.chapters.map(chap => (
                            <MenuItem key={chap.id} value={chap.id}>
                                <Checkbox checked={chap.isRead}/>
                                <ListItemText primary={<a href={chap.link}>{chap.name}</a>}/>
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
                <TableCell>
                    <Button><a href={nextChapToRead.link}>{nextChapToRead.name}</a></Button>
                    <Button>Save</Button>
                    <Button>Drop</Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(Row);