import React from "react"
import {withStyles} from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
    search: {
        border: '1px solid #00bea6',
        borderRadius: 5,
        paddingLeft: 15,
        display: 'flex'
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    input: {
        width: 100,
        border: 'none',
        transition: 'width 0.5s',
        fontSize: '90%',
        outline: 'none',
        '&:focus': {
            border: 'none',
            width: 250,
        },
    }
});

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchTerm: ''}
    }

    onSearchTermChange = (event) => {
        this.setState({searchTerm: event.target.value})
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter')
            this.search();
    };

    search = () => {
        this.props.onSearch(this.state.searchTerm);
    };

    close = () => {
        this.setState({searchTerm: ''});
        this.props.closeSearchResult();
    };

    render() {
        const {classes, isSearching} = this.props;
        const {searchTerm} = this.state;

        let icon = (isSearching)
            ? (<CloseIcon onClick={this.close}/>)
            : (<SearchIcon onClick={this.search}/>);

        // let inputClass = classes.input

        return (
            <div className={classes.search}>
                <input
                    className={classes.input}
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={this.onSearchTermChange}
                    onKeyPress={this.onKeyPress}
                />
                <span className={classes.icon}>
                    {icon}
                </span>
            </div>
        )
    }

}

export default withStyles(styles)(SearchBar);