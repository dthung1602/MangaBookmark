import React from "react"

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {Fab} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import Add from "./Add"

const styles = () => ({
    floatButtonGroup: {
        position: "fixed",
        bottom: 30,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        height: 90,
        justifyContent: 'space-between'
    }
});

class FloatButtons extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.floatButtonGroup}>
                <Fab onClick={scrollToTop} size={"small"} color={"secondary"}>
                    <ArrowUpwardIcon/>
                </Fab>
                <Fab size={"small"} color={"secondary"}>
                    <Add onAddManga={this.props.onAddManga}/>
                </Fab>
            </div>
        )
    }

}

function scrollToTop() {
    document.querySelector("#page-top").scrollIntoView({behavior: "smooth"})
}

export default withStyles(styles)(FloatButtons);
