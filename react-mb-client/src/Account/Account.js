import React, {Component} from "react"
import {withStyles} from "@material-ui/styles";
import {Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from '@material-ui/core/CircularProgress';

import BasicInfo from "./BasicInfo";
import ChangePassword from "./ChangePassword";
import LinkedAccounts from "./LinkedAccounts";

const styles = () => ({
    container: {
        marginTop: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 460
    },
    paper: {
        paddingBottom: 10,
        width: 700,
    },
    paperBody: {
        padding: '30px 130px 30px 130px'
    },
    textField: {
        marginTop: 30,
        marginBottom: 30
    },
    rightAlign: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'basic-info'
        }
    }

    onTabChange = (event, value) => {
        this.setState({tab: value});
    };

    render() {
        const {classes, user} = this.props;
        const {tab} = this.state;

        const dummyUser = {
            username: 'thanh hung duong',
            email: 'aba@sdfa.coams',
            facebookId: 0,
            facebookPic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1028439080684410&height=50&width=50&ext=1561185959&hash=AeQIflvU778CxT9f',
            googleId: 0,
            googlePic: 'https://lh6.googleusercontent.com/-H32d0Re-OkM/AAAAAAAAAAI/AAAAAAAAAD4/eo50NTPfL3E/photo.jpg',
        };

        if (!user) { // still loading
            return (
                <div className={classes.container}>
                    <CircularProgress/>
                </div>
            )
        }

        let content;
        switch (tab) {
            case 'basic-info':
                content = <BasicInfo user={user}/>;
                break;
            case 'change-password':
                content = <ChangePassword username={user.username}/>;
                break;
            default:
                content = <LinkedAccounts user={user}/>;
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tab}
                            onChange={this.onTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab value="basic-info" label="BASIC INFO"/>
                            <Tab value="change-password" label="CHANGE PASSWORD"/>
                            <Tab value="linked-account" label="LINKED ACCOUNT"/>
                        </Tabs>
                    </AppBar>

                    <div className={classes.paperBody}>
                        {content}
                    </div>
                </Paper>
            </div>
        )
    }
}


export default withStyles(styles)(Account);