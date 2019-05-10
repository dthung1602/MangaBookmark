import React from 'react';
import NavBar from './NavBar'
import Header from './Header'
import MangaTable from "./MangaTable";
import LoadMore from "./LoadMore";
import FloatButtons from "./FloatButtons";

function App(props) {
    return (
        <div>
            <NavBar username="hung"/>
            <Header/>
            <MangaTable/>
            <LoadMore/>
            <FloatButtons/>
        </div>
    );
}

export default App;
