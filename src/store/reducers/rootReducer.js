import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer.js';

export default createStore(
  combineReducers({
    authReducer
  }),
  applyMiddleware(thunk)
);