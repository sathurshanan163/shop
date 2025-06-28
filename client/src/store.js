import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import {
  login_reducer,
  register_reducer,
  profile_reducer,
} from './reducers/user';
import { products_reducer, product_reducer } from './reducers/product';
import cart_reducer from './reducers/cart';
import { create_order_reducer } from './reducers/order';
import { composeWithDevTools } from '@redux-devtools/extension';

const reducer = combineReducers({
  user_login: login_reducer,
  user_register: register_reducer,
  profile: profile_reducer,
  product_list: products_reducer,
  product_info: product_reducer,
  cart: cart_reducer,
  order: create_order_reducer,
});

const user_info_from_storage = localStorage.getItem('user_info')
  ? JSON.parse(localStorage.getItem('user_info'))
  : null;

const cart_items_from_storage = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

const shipping_address_from_storage = localStorage.getItem('shipping_address')
  ? JSON.parse(localStorage.getItem('shipping_address'))
  : {};

const initialState = {
  user_login: {
    user_info: user_info_from_storage,
  },
  cart: {
    items: cart_items_from_storage,
    shipping_address: shipping_address_from_storage,
  },
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
