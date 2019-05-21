import React from "react"
import {MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import ReadIcon from "@material-ui/icons/ArrowForwardIos";
import ReadAll from "@material-ui/icons/BookmarkBorderOutlined"

const styles = () => ({
    noWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        whiteSpace: 'nowrap'
    },
    actionBtn: {
        padding: 2,
        margin: '3px 8px 0px 8px',
        borderRadius: 3,
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer',
            background: '#efa230',
            color: '#fff'
        }
    },
    noChap: {
        fontSize: '125%',
        fontStyle: 'italic'
    }
});

const MAX_CHAP_NAME_LENGTH = 20;

class ChapterList extends React.Component {

    render() {
        const {classes, chapters, showNextChapBtn, markAllRead} = this.props;
        const chapterCount = chapters.length;

        if (chapterCount === 0)
            return <div className={classes.noChap}>No chapter available</div>;

        const readChaptersLinks = chapters.filter(ch => ch.isRead).map(ch => ch.link);

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
        if (nextChapToRead === undefined && !chapters[chapterCount - 1].isRead)
            nextChapToRead = chapters[chapterCount - 1];

        let nextChapBtn = '';
        if (showNextChapBtn && nextChapToRead !== undefined)
            nextChapBtn =
                <div className={classes.actionBtn}
                     title={"Read " + nextChapToRead.name}
                     onClick={() => window.open(nextChapToRead.link, '_blank')}>
                    <ReadIcon/>
                </div>;


        let markAllReadBtn = '';
        if (markAllRead !== undefined && !chapters.every(chap => chap.isRead))
            markAllReadBtn =
                <div
                    className={classes.actionBtn}
                    title="Mark all chapters as read"
                    onClick={this.props.onMarkAllChaptersRead}
                >
                    <ReadAll/>
                </div>;

        const select =
            <Select
                multiple
                value={readChaptersLinks}
                onChange={this.props.onChangeChapter}
                renderValue={displayLastChapRead}
            >
                {chapters.map(chap => (
                    <MenuItem key={chap.link} value={chap.link}>
                        <Checkbox checked={chap.isRead}/>
                        <ListItemText primary={<a href={chap.link}>{chap.name}</a>}/>
                    </MenuItem>
                ))}
            </Select>;


        if (markAllRead === 'before')
            return (
                <div className={classes.noWrap}>
                    {markAllReadBtn}
                    {select}
                    {nextChapBtn}
                </div>
            );

        return (
            <div className={classes.noWrap}>
                {select}
                <div>
                    {markAllReadBtn}
                    {nextChapBtn}
                </div>
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