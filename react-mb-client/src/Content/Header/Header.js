import React from "react"
import {withStyles} from "@material-ui/styles";
import SelectFollowing from "./SelectFollowing";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";

const styles = () => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

class Header extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.header} id={'page-top'}>
                <SelectFollowing
                    following={this.props.following}
                    onChange={this.props.onFollowingChange}
                />
                <SortBy
                    sortby={this.props.sortby}
                    onChange={this.props.onSortByChange}
                />
                <SearchBar/>
            </div>
        )
    }

}

export default withStyles(styles)(Header);