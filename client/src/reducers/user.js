import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  PROFILE_FAIL,
  PROFILE_RESET,
} from '../constants/user';

export const login_reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user_info: action.payload };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const register_reducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { is_loading: true };
    case REGISTER_SUCCESS:
      return { is_loading: false, user_info: action.payload };
    case REGISTER_FAIL:
      return { is_loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const profile_reducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, is_loading: true };
    case PROFILE_SUCCESS:
      return { is_loading: false, user: action.payload };
    case PROFILE_FAIL:
      return { is_loading: false, error: action.payload };
    case PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const update_profile_reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { is_loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { is_loading: false, success: true, user_info: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { is_loading: false, error: action.payload };
    case UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};