// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import dismissKeyboard from './middlewares/dissmissKeyboard';
import { setStore } from 'starterApp/src/lib/api';

import reducers from './reducers';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export default (callback: Function): Store => {
  const middlewares = [dismissKeyboard, sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(reducers, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);
  setStore(store);

  callback(store);
  return store;
};
