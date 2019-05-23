import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./formstyles"

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user.username,
            email: props.user.email,
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

    onEmailChange = (event) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = event.target.value;
        const {error} = this.state;
        error.email = undefined;
        if (!email.match(emailRegex))
            error.email = 'Invalid email';
        this.setState({email: email, error: error})
    };

    onSubmit = async () => {
        const {username, email} = this.state;
        const url = '/api/user/edit';
        const fetchOptions = {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email
            })
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok)
                window.location.reload();
            else
                this.setState({error: await response.json()})
        } catch (e) {
            alert(e.toString())
        }
    };

    render() {
        const {classes} = this.props;
        const {username, email, error} = this.state;

        const enableSubmit = Object.values(error).every(v => v === undefined);
        const errorMessage = (enableSubmit) ? '' :
            <div className={classes.announce}>
                {Object.values(error)
                    .filter(v => v !== undefined)
                    .map(v => <Typography className={classes.error}>{v}</Typography>)}
            </div>;

        return (
            <div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Username'
                        type='text'
                        value={username}
                        onChange={this.onUsernameChange}
                        error={error.username !== undefined}
                    />
                </div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Email'
                        type='email'
                        value={email}
                        onChange={this.onEmailChange}
                        error={error.email !== undefined}
                    />
                </div>
                {errorMessage}
                <div className={classes.rightAlign}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={this.onSubmit}
                        disabled={!enableSubmit}
                    >
                        Save
                    </Button>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(ChangePassword);