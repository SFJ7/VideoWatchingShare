import axios from 'axios';
import {ADD_COMMENT, COMMENT_ERROR, GET_COMMENTS, UPDATE_LIKES} from "./types";

//Get comments for logged out users
export const getComments = () => async dispatch => {
    try {
        const res = await axios.get('/api/comments');
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: COMMENT_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        });
    }
};

//Get comments for logged in users
export const getCommentsAll = () => async dispatch => {
    try {
        const res = await axios.get('/api/comments/all');
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: COMMENT_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        });
    }
};

//Like/Unlike
export const likeOrUnlike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/comments/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postId,
                likes: res.data
            }
        });
    } catch (e) {
        dispatch({
            type: COMMENT_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        });
    }
};

//Add Comment
export const addComment = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/comments/`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: COMMENT_ERROR,
            payload: {
                msg: e.response.statusText,
                status: e.response.status
            }
        });
    }
};