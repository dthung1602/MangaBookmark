import React from 'react';
import NavBar from './NavBar'
import Body from "./Body";

function App(props) {
    return (
        <div>
            <NavBar username="hung"/>
            <Body/>
        </div>
    );
}

export default App;
