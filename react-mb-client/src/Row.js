import React from "react"
import {withStyles} from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import {Button, Select, TableRow} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

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
        const allRead = manga.chapters.every(ch => ch.isRead);
        const chapterCount = manga.chapters.length;

        let status = null;
        let colorClass = '';
        if (manga.isCompleted)
            if (allRead) {
                status = 'Finished';
                colorClass = classes.F;
            } else {
                status = 'To read';
                colorClass = classes.TR;
            }
        else if (allRead) {
            status = 'Last chap reached';
            colorClass = classes.LCR;
        } else {
            status = 'New chap';
            colorClass = classes.NC;
        }

        const readChapters = manga.chapters.filter(ch => ch.isRead);

        let lastChapRead;
        let nextChapToRead;
        if (!manga.isCompleted) {
            nextChapToRead = manga.chapters[chapterCount - 1];
            for (let i = chapterCount - 2; i >= 0; i--)
                if (!manga.chapters[i].isRead && manga.chapters[i + 1].isRead) {
                    lastChapRead = manga.chapters[i + 1];
                    nextChapToRead = manga.chapters[i];
                }
        }

        let latestChapter = manga.chapters[chapterCount - 1];

        return (
            <TableRow>
                <TableCell classes={colorClass}>
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