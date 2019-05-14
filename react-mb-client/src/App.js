import React from 'react';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import Content from "./Content";
import NavBar from './NavBar/'
import theme from "./theme";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <NavBar username="hung"/>
            <Content/>
        </MuiThemeProvider>
    );
}

export default App;
