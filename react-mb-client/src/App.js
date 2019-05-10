import React from 'react';
import NavBar from './NavBar'
import FloatButtons from "./FloatButtons";
import Body from "./Body";

function App(props) {
    return (
        <div>
            <NavBar username="hung"/>
            <Body/>
            <FloatButtons/>
        </div>
    );
}

export default App;
