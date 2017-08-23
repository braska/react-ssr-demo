import React from 'react';
import { renderToString } from 'react-router-server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import configureStore from 'store/index';
import apiService from 'services/api';
import App from 'app';

export default () => {
  const store = configureStore({}, { api: apiService() });
  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  )
    .then(({ html: content }) => {
      return {
        content,
        state: serialize(store.getState()),
      };
    });
};
