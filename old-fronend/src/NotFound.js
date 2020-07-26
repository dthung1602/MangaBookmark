import React from "react"
import {withStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";

const styles = () => ({
    container: {
        margin: '100px 150px 0 150px'
    },
    link: {
        cursor: 'pointer'
    }
});

function NotFound(props) {
    const {classes, redirectToIndex} = props;

    return (
        <div className={classes.container}>
            <Typography variant="h4">404 - Not found</Typography>
            <hr/>

            <Typography
                className={classes.link}
                variant="body2"
                onClick={redirectToIndex}
            >
                Go to home page
            </Typography>
        </div>
    )
}

export default withStyles(styles)(NotFound);