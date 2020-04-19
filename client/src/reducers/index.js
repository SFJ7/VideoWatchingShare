import {combineReducers} from "redux";
import authReducer from "./authReducer";
import commentsReducer from "./commentsReducer";

export default combineReducers({
    authReducer,
    commentsReducer
})