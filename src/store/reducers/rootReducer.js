import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer.js';
import pegawaiReducer from './pegawaiReducer.js'
import profileReducer from './profileReducer.js'
import filterReducer from './filterReducer.js'
export default createStore(
  combineReducers({
    auth: authReducer,
    pegawai: pegawaiReducer,
    profile: profileReducer,
    filter: filterReducer
  }),
  applyMiddleware(thunk)
);