import React from "react"

import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import LOGO from './static/logo.png'

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
    }
});

class NavBar extends React.Component {

    render() {
        const {classes, user, logout, redirectToAccount, redirectToIndex} = this.props;

        return (
            <div>
                <AppBar color="primary" position="fixed">
                    <Toolbar className={classes.flex}>
                        <img
                            className={classes.logo}
                            src={LOGO} alt="MangaBookmark"
                            onClick={redirectToIndex}
                        />
                        <span className={classes.grow}/>
                        {(!user) ? '' :
                            <Typography className={classes.navBarText} onClick={redirectToAccount}>
                                Hello, {user.username}
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