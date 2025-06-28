import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
} from '../constants/cart';

export const add_to_cart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    },
  });
  localStorage.setItem('items', JSON.stringify(getState().cart.items));
};

export const remove_from_cart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
  localStorage.setItem('items', JSON.stringify(getState().cart.items));
};

export const save_shipping_address = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shipping_address', JSON.stringify(data));
};

export const clear_cart = () => (dispatch, getState) => {
  const { cart } = getState();
  dispatch({ type: CLEAR_CART });
  localStorage.setItem('items', JSON.stringify(cart));
};
