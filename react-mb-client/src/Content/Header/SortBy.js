import React from "react"
import {MenuItem, Select, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import SortByNameIcon from "@material-ui/icons/SortByAlpha";
import SortByLatestIcon from "@material-ui/icons/Schedule";
import SortByStatusIcon from "@material-ui/icons/LocalOffer";
import SortByManyToReadIcon from "@material-ui/icons/ImportContacts";

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    label: {
        paddingRight: 15,
        paddingBottom: 3
    },
    sortLabel: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            margin: '0 8px 0 2px',
            width: '18px',
            height: '18px'
        }
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
                    <MenuItem value="status">
                        <div className={classes.sortLabel}>
                            <SortByStatusIcon/>
                            Status
                        </div>
                    </MenuItem>
                    <MenuItem value="name">
                        <div className={classes.sortLabel}>
                            <SortByNameIcon/>
                            Name
                        </div>
                    </MenuItem>
                    <MenuItem value="latest">
                        <div className={classes.sortLabel}>
                            <SortByLatestIcon/>
                            Latest
                        </div>
                    </MenuItem>
                    <MenuItem value="many">
                        <div className={classes.sortLabel}>
                            <SortByManyToReadIcon/>
                            Many to read
                        </div>
                    </MenuItem>
                </Select>
            </div>
        )
    }
}


export default withStyles(styles)(SortBy);