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

let timeout = 0;
function scrollToTop() {
    let offset = document.getElementById('page-top').offsetTop;
    let diff = (offset - window.pageYOffset) / 16;
    if (Math.abs(diff) > 5) {
        window.scrollTo(0, (diff + window.pageYOffset));
        clearTimeout(timeout);
        setTimeout(scrollToTop, 16);
    } else {
        window.scrollTo(0, offset);
    }
}

export default withStyles(styles)(FloatButtons);
