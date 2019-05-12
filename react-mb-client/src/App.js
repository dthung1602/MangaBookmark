import React from 'react';
import NavBar from './NavBar'
import Body from "./Body";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <NavBar username="hung"/>
            <Body/>
        </MuiThemeProvider>
    );
}

export default App;
