import { combineReducers } from 'redux';
import { reducer as thunk } from 'redux-saga-thunk';

const reducers = {
  thunk,
};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach((key) => {
  const storeName = key.replace(/\.\/(.+)\/.+$/, '$1');
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
