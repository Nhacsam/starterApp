// @flow
import _ from 'lodash';
import { applyMiddleware, createStore, compose } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { offline } from 'redux-offline';
import { autoRehydrate } from 'redux-persist';
import defaultOfflineConfig from 'redux-offline/lib/defaults';

import dismissKeyboard from '../src/modules/middlewares/dissmissKeyboard';
import { setStore } from 'starterApp/src/lib/api';
import * as api from 'starterApp/src/lib/api';

import { pageChangedEmitterMiddleware } from '../src/modules/Navigation';

import reducers from '../src/modules/reducers';
import rootSaga from '../src/modules/sagas';

let lastEffect;
let callback = () => {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: {
    effectTriggered: function(effect) {
      lastEffect = effect;
    },
    effectResolved: function(id) {
      callback(id);
    },
    actionDispatched: function(action) {},
    effectRejected: function() {},
  },
});

export default (): Store => {
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

  const originalDispatch = store.dispatch.bind(store);
  store.dispatch = function(action) {
    originalDispatch(action);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const createdEffect = lastEffect;
        callback = id => {
          console.log(createdEffect.effectId, id);
          if (createdEffect.effectId === id) {
            return resolve();
          }
        };
      });
    });
  };

  return store;
};
