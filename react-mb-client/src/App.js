import React, {Component} from 'react';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

import NavBar from "./NavBar";
import Footer from "./Footer";
import Content from './Content';
import Login from './Login';
import NotFound from './NotFound';

import theme from "./theme";
import {withStyles} from "@material-ui/styles";


const styles = () => ({
    hidden: {
        display: 'none'
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {user: null}
    }

    componentDidMount() {
        this.loadUserData()
            .catch(this.redirectToLogin);
    }

    loadUserData = async () => {
        const url = '/api/user';
        const fetchOptions = {
            method: 'GET',
            credentials: "same-origin",
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok)
            this.setState({user: await response.json()});
        else
            throw await response.text();
    };

    redirectToLogin = () => {
        document.getElementById('hidden-login-link').click();
    };

    redirectToIndex = () => {
        document.getElementById('hidden-index-link').click();
    };

    logout = () => {
        fetch('/auth/logout')
            .then(() => {
                this.redirectToLogin();
                this.setState({user: null});
            })
            .catch(alert);
    };

    render() {
        const {classes} = this.props;
        const {user} = this.state;

        const content = <Content loadData={user !== null}/>;
        const login = <Login loadUserData={this.loadUserData} redirectToIndex={this.redirectToIndex}/>;

        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Link to='/' id='hidden-index-link' className={classes.hidden}/>
                    <Link to='/login' id='hidden-login-link' className={classes.hidden}/>

                    <NavBar
                        user={user}
                        logout={this.logout}
                    />

                    <Switch>
                        <Route
                            exact path="/"
                            render={() => content}
                        />
                        <Route
                            path="/login"
                            render={() => login}
                        />
                        <Route component={NotFound}/>
                    </Switch>

                    <Footer/>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(App);
