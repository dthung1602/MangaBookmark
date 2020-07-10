import React from "react"

import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Badge from "@material-ui/core/Badge";

import LOGO from './static/logo.png'

const VERSION = 'v1.9.0';

const styles = () => ({
    logo: {
        marginTop: 5,
        marginBottom: 5,
        width: 190,
        cursor: 'pointer'
    },
    navBarText: {
        color: '#fff',
        fontWeight: 800,
        textTransform: 'uppercase',
        paddingRight: 0,
        paddingLeft: 15,
        cursor: 'pointer'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    grow: {
        display: 'flex',
        flexGrow: 1
    },
});

class NavBar extends React.Component {

    render() {
        const {classes, user, logout, redirectToAccount, redirectToIndex} = this.props;
        let displayName;
        if (user)
            switch (user.primaryAccount) {
                case "google":
                    displayName = user.googleName;
                    break;
                case "facebook":
                    displayName = user.facebookName;
                    break;
                default:
                    displayName = user.username;
            }

        return (
            <div>
                <AppBar color="primary" position="fixed">
                    <Toolbar className={classes.flex}>
                        <img
                            className={classes.logo}
                            src={LOGO} alt="MangaBookmark"
                            onClick={redirectToIndex}
                        />
                        <Badge badgeContent={<span>{VERSION}</span>}>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </Badge>
                        <span className={classes.grow}/>
                        {(!user) ? '' :
                            <Typography className={classes.navBarText} onClick={redirectToAccount}>
                                Hello, {displayName}
                            </Typography>
                        }
                        {(!user) ? '' :
                            <Typography className={classes.navBarText} onClick={logout}>
                                Logout
                            </Typography>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}

export default withStyles(styles)(NavBar);