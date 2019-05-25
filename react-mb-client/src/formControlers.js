import Typography from "@material-ui/core/Typography";
import React from "react";

function onTabChange(event, value) {
    this.setState({tab: value});
}

function onUsernameChange(event) {
    const {error} = this.state;
    const username = event.target.value;
    error.username = undefined;

    if (username === '')
        error.username = 'Missing username';

    this.setState({username: username, error: error})
}

function onPasswordChange(event) {
    const username = this.props.username || this.state.username;
    const {error, confirm} = this.state;
    const password = event.target.value;
    error.password = undefined;

    if (password.length < 8)
        error.password = 'Password is too short';

    const p = password.toLowerCase();
    const u = username.toLowerCase();
    if (u.includes(p) || p.includes(u))
        error.password = 'Password and username are too similar';

    if (confirm !== undefined && confirm !== password)
        error.confirm = 'Confirm does not match password';

    this.setState({password: password, error: error})
}

function onConfirmChange(event) {
    const confirm = event.target.value;
    const {error, password} = this.state;
    error.confirm = undefined;

    if (confirm !== password)
        error.confirm = 'Confirm does not match password';

    this.setState({confirm: confirm, error: error})
}

function onEmailChange(event) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = event.target.value;
    const {error} = this.state;
    error.email = undefined;

    if (!email.match(emailRegex))
        error.email = 'Invalid email';

    this.setState({email: email, error: error})
}

function handleError() {
    const {classes} = this.props;
    const {error} = this.state;

    const enableSubmit = Object.values(error).every(v => v === undefined);
    const errorMessage = (enableSubmit) ? '' :
        <div className={classes.announce}>
            {Object.values(error)
                .filter(v => v !== undefined)
                .map(v => <Typography className={classes.error}>{v}</Typography>)}
        </div>;

    return {enableSubmit, errorMessage}
}

async function onSubmit(url, data, method = 'POST') {
    const fetchOptions = {
        method: method,
        credentials: "same-origin",
    };

    if (method === 'POST') {
        fetchOptions.headers = {'Content-Type': 'application/json'};
        fetchOptions.body = JSON.stringify(data);
    } else {
        url += '?';
        Object.keys(data).forEach((k => {
            url += `${k}=${data[k]}&`
        }));
        url = encodeURI(url.slice(0, url.length - 1));
    }

    try {
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            await this.props.loadUserData();
            this.props.redirectToIndex();
        } else {
            this.setState({error: await response.json()})
        }
    } catch (e) {
        alert(e)
    }
}

export {
    onTabChange,
    onUsernameChange,
    onPasswordChange,
    onConfirmChange,
    onEmailChange,
    handleError,
    onSubmit
}