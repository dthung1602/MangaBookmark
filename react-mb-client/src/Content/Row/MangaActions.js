import React from "react"
import {MenuItem, Select} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/DeleteForever"
import DoneIcon from "@material-ui/icons/Done"

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
});

class MangaActions extends React.Component {

    render() {
        const {classes, manga} = this.props;

        let markMangaCompletedBtn = '';
        if (!manga.isCompleted)
            markMangaCompletedBtn =
                <div className={classes.actionBtn}
                     title="Mark manga as completed"
                     onClick={this.props.onChangeCompleted}
                >
                    <DoneIcon/>
                </div>;

        const deleteMangaBtn =
            <div className={classes.actionBtn}
                 title="Delete manga"
                 onClick={this.props.deleteManga}
            >
                <DeleteIcon/>
            </div>;

        return (
            <div className={classes.noWrap}>
                <Select
                    value={manga.following}
                    onChange={this.props.onChangeFollowing}
                >
                    <MenuItem value="toread">toread</MenuItem>
                    <MenuItem value="following">following</MenuItem>
                    <MenuItem value="waiting">waiting</MenuItem>
                    <MenuItem value="dropped">dropped</MenuItem>
                    <MenuItem value="finished">finished</MenuItem>
                </Select>

                <div>
                    {markMangaCompletedBtn}
                    {deleteMangaBtn}
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(MangaActions);