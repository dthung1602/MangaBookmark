import React, {Component} from "react"
import {withStyles} from "@material-ui/styles";
import {Button, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    container: {
        marginTop: 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        paddingBottom: 10,
        width: 500,
    },
    paperBody: {
        padding: '0 45px 30px 45px'
    },
    textField: {
        marginTop: 30,
        marginBottom: 30
    },
    rightAlign: {
        display: 'flex',
        justifyContent: 'flex-end'
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
    error: {
        margin: '25px 0'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'login', // login, register
            username: '',
            password: '',
            confirm: '',
            email: '',
            error: {}
        }
    }

    onUsernameChange = (event) => {
        const {error} = this.state;
        const username = event.target.value;
        error.username = undefined;
        if (username === '')
            error.username = 'Missing username';
        this.setState({username: username, error: error})
    };

    onPasswordChange = (event) => {
        const {username, error, confirm} = this.state;
        const password = event.target.value;
        error.password = undefined;
        if (password.length < 8)
            error.password = 'Password is too short';
        const p = password.toLowerCase();
        const u = username.toLowerCase();
        if (u.includes(p) || p.includes(u))
            error.password = 'Password and username are too similar';
        if (confirm !== password)
            error.confirm = 'Confirm does not match password';
        this.setState({password: password, error: error})
    };

    onConfirmChange = (event) => {
        const confirm = event.target.value;
        const {error, password} = this.state;
        error.confirm = undefined;
        if (confirm !== password)
            error.confirm = 'Confirm does not match password';
        this.setState({confirm: confirm, error: error})
    };

    onEmailChange = (event) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = event.target.value;
        const {error} = this.state;
        error.email = undefined;
        if (!email.match(emailRegex))
            error.email = 'Invalid email';
        this.setState({email: email, error: error})
    };

    onTabChange = (event, value) => {
        this.setState({tab: value});
    };

    onSubmit = async () => {
        const {tab, username, password, email} = this.state;
        const data = {
            username: username,
            password: password,
            email: email
        };

        let url = (tab === 'login') ? '/auth/local?' : '/auth/local/register?';
        Object.keys(data).forEach(key => url += `${key}=${encodeURIComponent(data[key])}&`);
        url = url.slice(0, url.length - 1);

        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin"
        };

        try {
            const response = await fetch(url.toString(), fetchOptions);

            if (!response.ok)
                this.setState({error: await response.text()});
            else {
                this.props.loadUserData().catch(alert);
                this.props.redirectToIndex();
            }

        } catch (e) {
            this.setState({error: e.toString()})
        }
    };

    disableSubmit = () => {
        if (this.state.tab === 'register')
            return Object.values(this.state.error).every(v => v === undefined);
        return this.state.username.length > 0 && this.state.password.length >= 8;
    };

    render() {
        const {classes} = this.props;
        const {tab, username, password, confirm, email, error} = this.state;
        const disableSubmit = this.disableSubmit();

        const errorMessage = (disableSubmit || tab === 'login') ? '' :
            <div className={classes.error}>
                {Object.values(error)
                    .filter(v => v !== undefined)
                    .map(v => <Typography>{v}</Typography>)}
            </div>;

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
                        <div className={classes.textField}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Username'
                                value={username}
                                onChange={this.onUsernameChange}
                                error={error.username && tab === 'register'}
                            />
                        </div>
                        <div className={classes.textField}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={this.onPasswordChange}
                                error={error.password && tab === 'register'}
                            />
                        </div>

                        {(tab === 'login') ? '' :
                            <div>
                                <div className={classes.textField}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Confirm password'
                                        type='password'
                                        value={confirm}
                                        onChange={this.onConfirmChange}
                                        error={error.confirm && tab === 'register'}
                                    />
                                </div>
                                <div className={classes.textField}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Email'
                                        value={email}
                                        onChange={this.onEmailChange}
                                        error={error.email && tab === 'register'}
                                    />
                                </div>
                            </div>
                        }

                        {errorMessage}

                        <div className={classes.rightAlign}>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                onClick={this.onSubmit}
                                disabled={!disableSubmit}
                            >
                                Submit
                            </Button>
                        </div>

                        <div className={classes.otherOptions}>
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
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Login);