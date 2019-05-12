import React from "react"
import {MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    following: {
        display: 'flex',
        spacing: 20
    },
});

class SelectFollowing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.following}>
                <Typography variant={"subtitle1"}>
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