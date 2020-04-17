import React from 'react';
import '../App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./Navbar";


const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <h1>App</h1>
        </BrowserRouter>
    );
}

export default App;
