import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import {
    handleError,
    onConfirmChange,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onUsernameChange
} from "../formControlers"
import styles from "./formstyles"

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            email: '',
            error: {}
        }
    }

    onSubmit = () => {
        const url = '/auth/local/register';
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        onSubmit.bind(this)(url, data);
    };

    onUsernameChange = onUsernameChange.bind(this);

    onPasswordChange = onPasswordChange.bind(this);

    onConfirmChange = onConfirmChange.bind(this);

    onEmailChange = onEmailChange.bind(this);

    handleError = handleError.bind(this);

    render() {
        const {classes} = this.props;
        const {username, password, confirm, email, error} = this.state;
        const {enableSubmit, errorMessage} = this.handleError();

        return (
            <div>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Username'
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
                <div>
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
                    <div className={classes.textField}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='Email'
                            value={email}
                            onChange={this.onEmailChange}
                            error={error.email !== undefined}
                        />
                    </div>
                </div>

                {errorMessage}

                <div className={classes.rightAlign}>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={this.onSubmit}
                        disabled={!enableSubmit}
                    >
                        Register
                    </Button>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(RegisterForm);