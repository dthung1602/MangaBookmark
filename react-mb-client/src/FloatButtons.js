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
                        <Fab>
                            <ArrowUpwardIcon/>
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab>
                            <Add/>
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(FloatButtons);
