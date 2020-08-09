import React from "react"

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import UpdateIcon from "@material-ui/icons/Refresh";

import {Fab, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import AddDialog from "./AddDialog";

const styles = () => ({
    floatButtonGroup: {
        position: "fixed",
        bottom: 30,
        right: 10,
        display: 'flex',
        flexDirection: 'column',
        height: 135,
        justifyContent: 'space-between'
    }
});

class FloatButtons extends React.Component {

    render() {
        const {classes, following, onAddManga, updatingMangas} = this.props;
        const onUpdateManga = (updatingMangas) ? () => {
        } : this.props.onUpdateManga;
        const updateBtnColor = (updatingMangas) ? "default" : "secondary";

        return (
            <div className={classes.floatButtonGroup}>
                <Tooltip title="Top of page" placement="left">
                    <Fab onClick={scrollToTop} size="small" color="secondary" onDoubleClick={this.props.changeHidden}>
                        <ArrowUpwardIcon/>
                    </Fab>
                </Tooltip>
                <Tooltip title={`Update "${following}" mangas`} placement="left">
                    <Fab onClick={onUpdateManga} size="small" color={updateBtnColor}>
                        <UpdateIcon/>
                    </Fab>
                </Tooltip>
                <Tooltip title="Add manga" placement="left">
                    <Fab size="small" color="secondary">
                        <AddDialog onAddManga={onAddManga}/>
                    </Fab>
                </Tooltip>
            </div>
        )
    }

}

function scrollToTop() {
    document.querySelector("#page-top").scrollIntoView({behavior: "smooth"})
}

export default withStyles(styles)(FloatButtons);