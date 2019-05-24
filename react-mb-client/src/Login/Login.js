import React, {Component} from 'react';
import RegiterForm from './RegisterForm';
import LoginForm from './LoginForm';
import {Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles} from "@material-ui/styles";
import {GoogleLoginButton, FacebookLoginButton} from "react-social-login-buttons";
import Typography from "@material-ui/core/Typography";

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
        width: 400,
    },
    paperBody: {
        padding: '30px 40px 30px 40px'
    },
    loginOptions: {
        display: 'block',
        margin: '20px 0',
        padding: 0,
        textDecoration: 'none',
        color: '#fff',
        '&:visited': {
            color: '#fff'
        }
    },
    loginBtn: {
        color: '#fff !important'
    },
    otherOptions: {
        marginTop: 65
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'login'
        }
    }

    onTabChange = (event, value) => {
        this.setState({tab: value});
    };

    render() {
        const {classes} = this.props;
        const {tab} = this.state;

        let content;
        if (tab === 'login')
            content = <LoginForm/>;
        else
            content = <RegiterForm/>;

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
                            <Tab value="login" label="LOGIN"/>
                            <Tab value="register" label="REGISTER"/>
                        </Tabs>
                    </AppBar>

                    <div className={classes.paperBody}>
                        {content}
                        <br/><br/>
                        <a className={classes.loginOptions} href='/auth/google'>
                            <GoogleLoginButton>
                                <Typography variant='button' className={classes.loginBtn}>
                                    {tab} with Google
                                </Typography>
                            </GoogleLoginButton>
                        </a>
                        <a className={classes.loginOptions} href='/auth/facebook'>
                            <FacebookLoginButton>
                                <Typography variant='button' className={classes.loginBtn}>
                                    {tab} with Facebook
                                </Typography>
                            </FacebookLoginButton>
                        </a>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Login);