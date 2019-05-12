import React from "react"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {Fab} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Add from "./Add"

const styles = theme => ({
    floatButtonGroup: {
        position: "fixed",
        bottom: 50,
        right: 20,
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
                <Grid container direction='column'>
                    <Grid item>
                        <Fab onClick={scrollToTop}>
                            <ArrowUpwardIcon/>
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab>
                            <Add onAddManga={this.props.onAddManga}/>
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function scrollToTop() {
    let offset = document.getElementById('page-top').offsetTop;
    let diff = (offset - window.pageYOffset) / 16;
    if ( Math.abs(diff) > 1 ) {
        window.scrollTo(0, (diff + window.pageYOffset));
        setTimeout(scrollToTop, 8);
    } else {
        window.scrollTo(0, offset);
    }
}

export default withStyles(styles)(FloatButtons);
