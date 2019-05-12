import React from "react"
import {AppBar, Toolbar, Typography} from "@material-ui/core";

import LOGO from './logo.png'
import Grow from "./Grow";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    logo: {
        marginTop: 5,
        marginBottom: 5,
        width: 190,
    },
    navBarText: {
        color: '#555',
        fontWeight: 800,
        textTransform: 'uppercase',
        paddingRight: 0,
        paddingLeft: 15,
    },
    navBarLink: {
        color: '#555',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#000',
            fontWeight: 'bold'
        }
    }
});

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        }
    }

    render() {
        const {classes} = this.props;
        const username = this.state.username;

        return (
            <div>
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <img className={classes.logo} src={LOGO} alt="MangaBookmark"/>
                        <Grow/>
                        <Typography className={classes.navBarText}>
                            Hello, {username}
                        </Typography>
                        <Typography className={classes.navBarText}>
                            <a href='/auth/logout' className={classes.navBarLink}>Logout</a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

export default withStyles(styles)(NavBar);