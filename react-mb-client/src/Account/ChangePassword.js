import React from "react"
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import {handleError, onConfirmChange, onPasswordChange, onSubmit} from "../formControlers";
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

    onPasswordChange = onPasswordChange.bind(this);

    onConfirmChange = onConfirmChange.bind(this);

    handleError = handleError.bind(this);

    onSubmit = () => {
        const url = '/api/user/changepass';
        const data = {
            currentPassword: this.state.currentPassword,
            password: this.state.password
        };
        onSubmit.bind(this)(url, data);
    };

    render() {
        const {classes} = this.props;
        const {currentPassword, password, confirm, error, lastUpdated} = this.state;

        const {enableSubmit, errorMessage} = this.handleError();
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