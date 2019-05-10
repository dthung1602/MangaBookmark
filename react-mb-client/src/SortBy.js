import React from "react"
import {MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    sortby: {
        display: 'flex',
        spacing: 20
    },
    inputRoot: {},
    inputInput: {}
});

class SortBy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const onChange = this.props.onChange;
        const sortby = this.props.sortby;

        return (
            <div className={classes.sortby}>
                <Typography variant={"subtitle1"}>
                    Sort by
                </Typography>
                <Select value={sortby} onChange={onChange}>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="many">Many to read</MenuItem>
                </Select>
            </div>
        )
    }
}


export default withStyles(styles)(SortBy);