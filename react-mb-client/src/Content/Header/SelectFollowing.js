import React from "react"
import {Input, MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    label: {
        paddingRight: 15,
        paddingBottom: 3
    },
    disable: {
        filter: 'opacity(50%)'
    }
});

class SelectFollowing extends React.Component {

    render() {
        const {classes, disable} = this.props;
        let labelClass = classes.label;
        if (disable) labelClass += ' ' + classes.disable;

        return (
            <div className={classes.root}>
                <Typography variant={"subtitle1"}>
                    <span className={labelClass}>Following status</span>
                </Typography>
                <Select
                    value={this.props.following}
                    onChange={this.props.onChange}
                    input={<Input disabled={disable}/>}
                >
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