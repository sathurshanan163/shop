import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
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