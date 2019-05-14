import React from "react"
import {MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    label: {
        paddingRight: 15,
        paddingBottom: 3
    }
});

class SelectFollowing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography className={classes.label} variant={"subtitle1"}>
                    Following status
                </Typography>
                <Select value={this.props.following} onChange={this.props.onChange}>
                    <MenuItem value="toread">To read</MenuItem>
                    <MenuItem value="following">Following</MenuItem>
                    <MenuItem value="waiting">Waiting</MenuItem>
                    <MenuItem value="dropped">Dropped</MenuItem>
                    <MenuItem value="finished">Finished</MenuItem>
                </Select>
            </div>
        )
    }
}


export default withStyles(styles)(SelectFollowing);