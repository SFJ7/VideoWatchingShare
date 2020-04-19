import {GET_COMMENTS, COMMENT_ERROR, UPDATE_LIKES, ADD_COMMENT} from "../actions/types";

const initialState = {
    comments: [],
    comment: null,
    loading: true
    // error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [payload, ...state.comments],
                loading: false
            }
        case COMMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.id ? {...comment, likes: payload.likes} : comment)
            }
        default:
            return state;
    }
}