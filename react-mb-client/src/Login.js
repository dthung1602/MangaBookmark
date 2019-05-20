import React, {Component} from "react"
import {withStyles} from "@material-ui/styles";
import {Button, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const styles = () => ({
    login: {
        marginTop: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        paddingBottom: 10,
        width: 400,
    },
    paperBody: {
        padding: '0 45px'
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
    otherOptions: {
        marginTop: 65
    },
    error: {
        margin: '25px 0',
        color: '#f00',
        fontSize: '100%',
        fontWeight: '550'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'login', // login, register
            username: '',
            password: '',
            confirm: '',
            email: '',
            error: ''
        }
    }

    onTextFieldChange = (field) => (event) => {
        this.setState({[field]: event.target.value})
    };

    onModeChange = (event, value) => {
        this.setState({mode: value});
    };

    onSubmit = async () => {
        const {mode, username, password, email} = this.state;
        const data = {
            username: username,
            password: password,
            email: email
        };

        let url = (mode === 'login') ? '/auth/local?' : '/auth/local/register?';
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

    isValid = () => {
        const {mode, username, password, confirm, email} = this.state;
        if (username === '' || password === '')
            return false;
        if (mode === 'register')
            return (confirm === password && email !== '');
        return true;
    };

    render() {
        const {classes} = this.props;
        const {mode, username, password, confirm, email, error} = this.state;
        const capMode = capitalize(mode);

        return (
            <div className={classes.login}>

                <Paper className={classes.paper}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={mode}
                            onChange={this.onModeChange}
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
                                onChange={this.onTextFieldChange('username')}
                            />
                        </div>
                        <div className={classes.textField}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={this.onTextFieldChange('password')}
                            />
                        </div>

                        {(mode === 'login') ? '' :
                            <div>
                                <div className={classes.textField}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Confirm password'
                                        type='password'
                                        value={confirm}
                                        onChange={this.onTextFieldChange('confirm')}
                                    />
                                </div>
                                <div className={classes.textField}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Email'
                                        value={email}
                                        onChange={this.onTextFieldChange('email')}
                                    />
                                </div>
                            </div>
                        }

                        {(!error) ? '' : <div className={classes.error}>{error}</div>}

                        <div className={classes.rightAlign}>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                onClick={this.onSubmit}
                                disabled={!this.isValid()}
                            >
                                Submit
                            </Button>
                        </div>

                        <div className={classes.otherOptions}>
                            <a className={classes.loginOptions} href='/auth/google'>
                                <GoogleLoginButton>{capMode} with Google</GoogleLoginButton>
                            </a>
                            <a className={classes.loginOptions} href='/auth/facebook'>
                                <FacebookLoginButton>{capMode} with Facebook</FacebookLoginButton>
                            </a>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default withStyles(styles)(Login);