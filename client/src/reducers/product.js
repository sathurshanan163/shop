import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
} from '../constants/product';

export const products_reducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { is_loading: true, products: [] };
    case PRODUCTS_SUCCESS:
      return { is_loading: false, products: action.payload };
    case PRODUCTS_FAIL:
      return { is_loading: false, error: action.payload };
    default:
      return state;
  }
};

export const product_reducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state, is_loading: true };
    case PRODUCT_SUCCESS:
      return { is_loading: false, product: action.payload };
    case PRODUCT_FAIL:
      return { is_loading: false, error: action.payload };
    default:
      return state;
  }
};
