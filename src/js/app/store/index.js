/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './sagas';
import middlewares from './middlewares';

export default function configureStore(initialState, services = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const composedEnchacers = !__SERVER__ && __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
      applyMiddleware(
        ...middlewares,
        sagaMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
    : compose(applyMiddleware(
      ...middlewares,
      sagaMiddleware,
    ));

  const store = createStore(rootReducer, initialState, composedEnchacers);
  let sagaTask = sagaMiddleware.run(rootSaga, services);

  if (module.hot && __DEV__) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer);
    });

    module.hot.accept('./sagas', () => {
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(rootSaga);
      });
    });
  }

  return store;
}
