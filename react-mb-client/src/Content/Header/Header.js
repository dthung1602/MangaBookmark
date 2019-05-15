import React from "react"
import {withStyles} from "@material-ui/styles";
import SelectFollowing from "./SelectFollowing";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";

const styles = () => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    paddingTop: {
        paddingTop: 100
    }
});

class Header extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.paddingTop} id={'page-top'}/>
                <div className={classes.header}>
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
            </div>
        )
    }

}

export default withStyles(styles)(Header);