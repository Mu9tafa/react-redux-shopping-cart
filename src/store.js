import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { filterReducer } from "./reducers/filterReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const store = createStore(
   combineReducers({
      products: productsReducer,
      filteredProducts: filterReducer,
   }),
   initialState,
   composeEnhancer(applyMiddleware(thunk))
);
export default store;
