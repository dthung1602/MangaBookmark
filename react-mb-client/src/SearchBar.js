import React from "react"
import {withStyles} from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const styles = () => ({
    search: {
        border: '1px solid #00bea6',
        borderRadius: 5,
        display: 'flex'
    },
    searchIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    input: {
        // display: 'flex'
    }
});

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: props.searchTerm
        }
    }

    render() {
        const {classes} = this.props;
        const searchTerm = this.state.searchTerm;

        return (
            <div className={classes.search}>
                <span className={classes.searchIcon}>
                    <SearchIcon/>
                </span>
                <InputBase className={classes.input} placeholder="Search…" value={searchTerm}/>
            </div>
        )
    }

}

export default withStyles(styles)(SearchBar);