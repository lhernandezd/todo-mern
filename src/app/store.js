import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

//import the root reducer
import rootReducer from "./reducers";

//create an object for the default data
const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(
  applyMiddleware(thunk))
);

export default store;
