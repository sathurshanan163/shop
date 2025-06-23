import { 
    LOGIN_REQUEST, 
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
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

export const register_reducer = (state = {}, action) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            return {is_loading: true};
        case REGISTER_SUCCESS:
            return {is_loading: false, user_info: action.payload};
        case REGISTER_FAIL:
            return {is_loading: false, error: action.payload};
        case LOGOUT:
            return {};
        default:
            return state;
    };
};