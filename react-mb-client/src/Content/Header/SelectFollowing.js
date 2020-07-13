import React from "react"
import {Input, MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import ToReadIcon from "@material-ui/icons/DateRange";
import FollowingIcon from "@material-ui/icons/ImportContacts";
import WaitingIcon from "@material-ui/icons/HourglassEmpty";
import FinishedIcon from "@material-ui/icons/Done";
import DroppedIcon from "@material-ui/icons/Block";


const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    label: {
        paddingRight: 15,
        paddingBottom: 3
    },
    disable: {
        filter: 'opacity(50%)'
    },
    followingStatus: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            margin: '0 8px 0 2px',
            width: '18px',
            height: '18px'
        }
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
                    <MenuItem value="toread">
                        <div className={classes.followingStatus}>
                            <ToReadIcon/>To read
                        </div>
                    </MenuItem>
                    <MenuItem value="following">
                        <div className={classes.followingStatus}>
                            <FollowingIcon/> Following
                        </div>
                    </MenuItem>
                    <MenuItem value="waiting">
                        <div className={classes.followingStatus}>
                            <WaitingIcon/>Waiting
                        </div>
                    </MenuItem>
                    <MenuItem value="dropped">
                        <div className={classes.followingStatus}>
                            <DroppedIcon/>Dropped
                        </div>
                    </MenuItem>
                    <MenuItem value="finished">
                        <div className={classes.followingStatus}>
                            <FinishedIcon/>Finished
                        </div>
                    </MenuItem>
                </Select>
            </div>
        )
    }
}


export default withStyles(styles)(SelectFollowing);