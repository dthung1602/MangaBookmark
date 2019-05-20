import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NavBar from "./NavBar";
import Footer from "./Footer";
import Content from './Content';
import Login from './Login';
import NotFound from './NotFound';

import theme from "./theme";
import './index.css';

const page =
    <MuiThemeProvider theme={theme}>
        <NavBar username="hung"/>
        <Router>
            <Switch>
                <Route exact path="/" component={Content}/>
                <Route path="/login" component={Login}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
        <Footer/>
    </MuiThemeProvider>;


ReactDOM.render(page, document.getElementById('root'));

