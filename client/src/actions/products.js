import axios from "axios";
import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL
} from "../constants/product";

export const list_products = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCTS_REQUEST});
        const {data} = await axios.get("/api/products");
        console.log("data");
        dispatch({type: PRODUCTS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCTS_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message
        });
    };
};