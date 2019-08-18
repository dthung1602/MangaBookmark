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

class SortBy extends React.Component {

    render() {
        const {classes} = this.props;
        const onChange = this.props.onChange;
        const sortby = this.props.sortby;

        return (
            <div className={classes.root}>
                <Typography className={classes.label} variant={"subtitle1"}>
                    Sort by
                </Typography>
                <Select value={sortby} onChange={onChange} variant={"filled"} on >
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