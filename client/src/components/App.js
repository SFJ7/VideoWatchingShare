import React from 'react';
import '../App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Auth from "./auth/Auth";
import Feed from "./Feed";


const App = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Auth}/>
            <Route exact path='/feed' component={Feed}/>
        </BrowserRouter>
    );
}

export default App;
