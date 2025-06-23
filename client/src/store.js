import {legacy_createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {login_reducer, register_reducer} from "./reducers/user";

const reducer = combineReducers({
    user_login: login_reducer,
    user_register: register_reducer
});

const user_info_from_storage = localStorage.getItem("user_info")
? JSON.parse(localStorage.getItem("user_info")) : null;

const initialState = {
    user_login: {user_info: user_info_from_storage}
};

const middleware = [thunk];

const store = legacy_createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;