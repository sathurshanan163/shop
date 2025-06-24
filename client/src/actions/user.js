import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../constants/user";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {data} = await axios.post("/api/users/login", {email, password}, config);
        dispatch({type: LOGIN_SUCCESS, payload: data});
        localStorage.setItem("user_info", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message
        });
    };
};

export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({type: REGISTER_REQUEST});
      const config = {
        headers: {
            "Content-Type": "application/json"
        }
      };  
      const {data} = await axios.post("/api/users/register", {name, email, password}, config);      
      dispatch({type: REGISTER_SUCCESS, payload: data});
      dispatch({type: LOGIN_SUCCESS, payload: data});
      localStorage.setItem("user_info", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message
        });
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("user_info");
    dispatch({type: LOGOUT});
};