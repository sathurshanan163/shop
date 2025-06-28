import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_RESET,
} from '../constants/order';

export const create_order_reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        is_loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        is_loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        is_loading: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
