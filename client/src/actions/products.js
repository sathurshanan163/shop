import axios from "axios";
import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL
} from "../constants/product";

export const list_products = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCTS_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCTS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCTS_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message
        });
    };
};

export const list_product_info = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({type: PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message
        });
    };
};
