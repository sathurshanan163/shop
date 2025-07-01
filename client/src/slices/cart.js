import { createSlice } from '@reduxjs/toolkit';
import { update_cart } from '../utils/cart';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      items: [],
      shipping_address: {},
    };

const cart_slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const { user, ...item } = action.payload;
      const item_found = state.items.find((x) => x._id === item._id);
      if (item_found) {
        state.items = state.items.map((x) =>
          x._id === item_found._id ? item : x
        );
      } else {
        state.items = [...state.items, item];
      }
      return update_cart(state, item);
    },
    remove_from_cart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
      return update_cart(state);
    },
    save_shipping_address: (state, action) => {
      state.shipping_address = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clear_items: (state, action) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    reset_cart: (state) => (state = initialState),
  },
});

export const {
  add_to_cart,
  remove_from_cart,
  save_shipping_address,
  clear_items,
  reset_cart,
} = cart_slice.actions;

export default cart_slice.reducer;
