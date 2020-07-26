import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import {handleError, onEmailChange, onSubmit, onUsernameChange} from "../formControlers"
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

    onUsernameChange = onUsernameChange.bind(this);

    onEmailChange = onEmailChange.bind(this);

    handleError = handleError.bind(this);

    onSubmit = () => {
        const url = '/api/user/edit';
        const data = {
            username: this.state.username,
            email: this.state.email
        };
        onSubmit.bind(this)(url, data);
    };


    render() {
        const {classes} = this.props;
        const {username, email, error} = this.state;
        const {enableSubmit, errorMessage} = this.handleError();

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