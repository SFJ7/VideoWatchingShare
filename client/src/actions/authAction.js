import axios from 'axios';
import {AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, LOGOUT} from "./types";
import setAuthToken from "../util/setAuthToken";

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (e) {
            dispatch({type: AUTH_ERROR});
        }
    }
};

export const register = (name, email, password, acceptedAgreement) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        name,
        email,
        password,
        acceptedAgreement
    });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (e) {
        dispatch({
            type: REGISTER_FAIL,
            payload: e.response.data.error
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (e) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}