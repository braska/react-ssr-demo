import React from 'react';
import { renderToString } from 'react-router-server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import configureStore from 'store/index';
import apiService from 'services/api';
import App from 'app';

export default (req) => {
  const url = req.url;
  const store = configureStore({}, { api: apiService() });
  const context = {};
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  )
    .then(({ html: content }) => {
      if (context.url) {
        return { context };
      }
      return {
        context,
        content,
        state: serialize(store.getState()),
      };
    });
};
