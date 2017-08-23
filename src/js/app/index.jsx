import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import createStore from 'store/index';
import apiService from 'services/api';

import App from './app';

const store = createStore(
  // eslint-disable-next-line no-underscore-dangle
  window.__PRELOADED_STATE__,
  {
    api: apiService(),
  },
);

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (__DEV__ && module.hot) {
  module.hot.accept('./app', () => { render(App); });
}
