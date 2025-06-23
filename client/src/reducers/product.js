import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL 
} from "../constants/product";

export const products_reducer = (state = {products: []}, action) => {
    switch(action.type) {
        case PRODUCTS_REQUEST:
            return {is_loading: true, products: []};
        case PRODUCTS_SUCCESS:
            return {is_loading: false, products: action.payload};
        case PRODUCTS_FAIL:
            return {is_loading: false, error: action.payload};
        default:
            return state;
    };
};