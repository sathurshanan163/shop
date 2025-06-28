import axios from 'axios';
import { CLEAR_CART } from '../constants/cart';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from '../constants/order';
import {logout} from './user';

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
  } catch(error) {
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
