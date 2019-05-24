import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./formstyles";
import {onPasswordChange, onUsernameChange, handleError, onSubmit} from "../formControlers";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: {}
        }
    }

    onSubmit = () => {
        const url = '/auth/local';
        const data = {
                username: this.state.username,
                password: this.state.password
            };

        onSubmit.bind(this)(url, data);
    };

    onUsernameChange = onUsernameChange.bind(this);

    onPasswordChange = onPasswordChange.bind(this);

    handleError = handleError.bind(this);

    render() {
        const {classes} = this.props;
        const {username, password, error} = this.state;
        const {enableSubmit , errorMessage} = this.handleError();

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
                        label='Password'
                        type='password'
                        value={password}
                        onChange={this.onPasswordChange}
                        error={error.password !== undefined}
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
                        Login
                    </Button>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(LoginForm);