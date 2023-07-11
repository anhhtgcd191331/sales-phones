import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { UserSigninReducer, UserSignupReducer } from "./reduces/UserReduces";
import { ChatReducer } from "./reduces/ChatReducer";
import { getAllProductReducer } from "./reduces/ProductReducer";
import { SelectListReducer } from "./reduces/SelectListReducer";
import { ListTypeProductReducer } from "./reduces/ListTypeProductReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : undefined,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  userSignup: UserSignupReducer,
  userSignin: UserSigninReducer,
  chat: ChatReducer,
  allProduct: getAllProductReducer,
  selectList: SelectListReducer,
  allTypeProduct: ListTypeProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
