import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
} from '../constants/cart';

const cart_reducer = (state = { items: [], shipping_address: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const item_found = state.items.find((x) => x.product === item.product);
      if (item_found) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.product === item_found.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((x) => x.product !== action.payload),
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping_address: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cart_reducer;
