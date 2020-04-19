import React, {useEffect} from 'react';
import '../App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Auth from "./auth/Auth";
import Feed from "./Feed";
import {loadUser} from "../actions/authAction";
import {useDispatch} from "react-redux";
import setAuthToken from "../util/setAuthToken";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        setAuthToken(localStorage.token)
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Route exact path='/' component={Feed}/>
            <Route exact path='/auth' component={Auth}/>
        </BrowserRouter>
    );
}

export default App;
