// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import dismissKeyboard from './middlewares/dissmissKeyboard';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (callback: Function) => {
  const middlewares = [dismissKeyboard];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(reducers, composeEnhancers(...enhancers));

  callback(store);
  return store;
};
