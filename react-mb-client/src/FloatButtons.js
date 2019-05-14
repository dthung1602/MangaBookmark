import React from "react"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {Fab} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Add from "./Add"

const styles = theme => ({
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
    constructor(props) {
        super(props);
    }


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
    let offset = document.getElementById('page-top').offsetTop;
    let diff = (offset - window.pageYOffset) / 16;
    if (Math.abs(diff) > 0.25) {
        window.scrollTo(0, (diff + window.pageYOffset));
        setTimeout(scrollToTop, 8);
    } else {
        window.scrollTo(0, offset);
    }
}

export default withStyles(styles)(FloatButtons);
