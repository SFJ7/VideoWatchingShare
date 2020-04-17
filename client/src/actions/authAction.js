import axios from 'axios';
import {REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR} from "./types";

export const loadUser = async dispatch => {
    return
};

export const register = (name, email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}