import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer.js';
import pegawaiReducer from './pegawaiReducer.js'
export default createStore(
  combineReducers({
    auth: authReducer,
    pegawai: pegawaiReducer
  }),
  applyMiddleware(thunk)
);