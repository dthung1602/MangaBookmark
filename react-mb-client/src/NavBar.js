import React from "react"
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import LOGO from './logo.png'

const styles = theme => ({
    root: {
        width: "100%"
    },
    grow: {
        flexGrow: 1
    },
    logo: {
        width: 100
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
                        <span className={classes.grow}/>
                        <Typography className={classes.loginHello}>
                            Hello, {username}
                        </Typography>
                        <Typography className={classes.navbarLink}>
                            Logout
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(NavBar);