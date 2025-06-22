import { 
    LOGIN_REQUEST, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    LOGOUT
 } from "../constants/user";

export const login_reducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {loading: true};
        case LOGIN_SUCCESS:
            return {loading: false, user_info: action.payload};
        case LOGIN_FAIL:
            return {loading: false, error: action.payload};
        case LOGOUT:
            return {};
        default:
            return state;
    };
};