import React from "react"
import {withStyles} from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    sortby: {
        display: 'flex',
        spacing: 20
    },
    search: {}
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
                <SearchIcon/>
                <InputBase placeholder="Search…" value={searchTerm}/>
            </div>
        )
    }
}

export default withStyles(styles)(SearchBar);