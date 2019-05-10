import React from "react"
import {withStyles} from "@material-ui/styles";
import SortBy from './SortBy';
import SearchBar from './SearchBar';

const styles = theme => ({
    header: {
        display: 'flex',
        paddingTop: 100
    },
    grow: {
        flexGrow: 1
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.header}>
                <SortBy sortby="name"/>
                <div className={classes.grow}/>
                <SearchBar/>
            </div>
        );
    }
}

export default withStyles(styles)(Header);