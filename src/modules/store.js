// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { offline } from 'redux-offline';
import { autoRehydrate } from 'redux-persist';
import defaultOfflineConfig from 'redux-offline/lib/defaults';

import dismissKeyboard from './middlewares/dissmissKeyboard';
import { setStore } from 'starterApp/src/lib/api';
import * as api from 'starterApp/src/lib/api';

import { pageChangedEmitterMiddleware } from './Navigation';

import reducers from './reducers';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export default (callback: Function): Store => {
  const middlewares = [dismissKeyboard, sagaMiddleware, pageChangedEmitterMiddleware];

  const offlineConfig = {
    ...defaultOfflineConfig,
    persistOptions: {
      whitelist: ['model', 'tvShowMainList', 'offline'],
    },
    effect: ({ method, params }) => {
      return api[method](...params);
    },
  };
  const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];
  const store = offline(offlineConfig)(createStore)(reducers, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);
  setStore(store);

  callback(store);
  return store;
};
