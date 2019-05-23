import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./formstyles"

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            confirm: '',
            lastUpdated: undefined,
            error: {}
        }
    }

    onCurrentPasswordChange = (event) => {
        const {error} = this.state;
        const currentPassword = event.target.value;
        error.currentPassword = undefined;
        if (currentPassword.length < 8)
            error.currentPassword = 'Invalid current password';
        this.setState({currentPassword: currentPassword, error: error})
    };

    onPasswordChange = (event) => {
        const {username} = this.props;
        const {error, confirm} = this.state;
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

    onSubmit = async () => {
        const {currentPassword, password} = this.state;
        const url = '/api/user/changepass';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                currentPassword: currentPassword,
                password: password
            })
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok)
                this.setState({
                    currentPassword: '',
                    password: '',
                    confirm: '',
                    error: {},
                    lastUpdated: new Date()
                });
            else
                this.setState({error: await response.json()})
        } catch (e) {
            alert(e.toString())
        }
    };

    render() {
        const {classes} = this.props;
        const {currentPassword, password, confirm, error, lastUpdated} = this.state;

        const enableSubmit = Object.values(error).every(v => v === undefined);
        const errorMessage = (enableSubmit) ? '' :
            <div className={classes.announce}>
                {Object.values(error)
                    .filter(v => v !== undefined)
                    .map(v => <Typography className={classes.error}>{v}</Typography>)}
            </div>;
        const lastUpdateMessage = (lastUpdated === undefined || enableSubmit) ? '' :
            <div className={classes.announce}>
                <Typography className={classes.success}>Password changed at {lastUpdated.toString()}</Typography>
            </div>;

        return (
            <div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Current password'
                        type='password'
                        value={currentPassword}
                        onChange={this.onCurrentPasswordChange}
                        error={error.currentPassword !== undefined}
                    />
                </div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='New password'
                        type='password'
                        value={password}
                        onChange={this.onPasswordChange}
                        error={error.password !== undefined}
                    />
                </div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Confirm password'
                        type='password'
                        value={confirm}
                        onChange={this.onConfirmChange}
                        error={error.confirm !== undefined}
                    />
                </div>
                {errorMessage}
                {lastUpdateMessage}
                <div className={classes.rightAlign}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={this.onSubmit}
                        disabled={!enableSubmit}
                    >
                        Change password
                    </Button>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(ChangePassword);