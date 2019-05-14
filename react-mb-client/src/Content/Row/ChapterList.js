import React from "react"
import {MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import ReadIcon from "@material-ui/core/SvgIcon/SvgIcon";

const styles = () => ({
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
});

const MAX_CHAP_NAME_LENGTH = 20;

class ChapterList extends React.Component {

    render() {
        const {classes} = this.props;

        const chapters = this.props.chapters;

        const chapterCount = chapters.length;
        const readChaptersId = chapters.filter(ch => ch.isRead).map(ch => ch._id);

        let lastChapRead = {name: '-----'};
        for (let i = 0; i < chapterCount; i++)
            if (chapters[i].isRead) {
                lastChapRead = chapters[i];
                break;
            }

        const displayLastChapRead = () => <span>{shortenString(lastChapRead.name)}</span>;

        let nextChapToRead;
        for (let i = 0; i < chapterCount - 1; i++)
            if (!chapters[i].isRead && chapters[i + 1].isRead) {
                nextChapToRead = chapters[i];
                break;
            }
        if (!chapters[chapterCount - 1].isRead)
            nextChapToRead = chapters[chapterCount - 1];

        let nextChapBtn = '';
        if (nextChapToRead !== undefined)
            nextChapBtn =
                <div className={classes.actionBtn}
                     title={"Read " + nextChapToRead.name}
                     onClick={() => window.open(nextChapToRead.link, '_blank')}>
                    <ReadIcon/>
                </div>;

        return (
            <div className={classes.noWrap}>
                <Select
                    multiple
                    value={readChaptersId}
                    onChange={this.props.onChangeChapter}
                    renderValue={displayLastChapRead}
                >
                    {chapters.map(chap => (
                        <MenuItem key={chap._id} value={chap._id}>
                            <Checkbox checked={chap.isRead}/>
                            <ListItemText primary={<a href={chap.link}>{chap.name}</a>}/>
                        </MenuItem>
                    ))}
                </Select>
                {nextChapBtn}
            </div>
        )
    }

}


function shortenString(str) {
    if (str.length <= MAX_CHAP_NAME_LENGTH)
        return str;
    return str.slice(0, MAX_CHAP_NAME_LENGTH) + " ..."
}

export default withStyles(styles)(ChapterList);