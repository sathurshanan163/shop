import axios from 'axios';
import { CLEAR_CART } from '../constants/cart';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
} from '../constants/order';
import { logout } from './user';

export const create_order = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const {
      user_login: { user_info },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user_info.token}`,
      },
    };
    const { data } = await axios.post('/api/orders', order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    dispatch({ type: CLEAR_CART, payload: data });
    localStorage.removeItem('items');
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (msg === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: CREATE_ORDER_FAIL, payload: msg });
  }
};

export const order_info = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQUEST });

    const {
      user_login: { user_info },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user_info.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_SUCCESS, payload: data });
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (msg === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: ORDER_FAIL, payload: msg });
  }
};
