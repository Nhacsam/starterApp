// @flow

import { combineReducers } from 'redux';
import { RootNavigator } from 'starterApp/src/Scenes';

import type { NavigationState } from 'react-navigation';

const routerReducer = (state, action) => {
  if (action.type.startsWith('Navigation/')) {
    const { type, routeName } = action;
    const lastRoute = state.routes[state.routes.length - 1];
    if (type === lastRoute.type && routeName === lastRoute.routeName) {
      console.warn(
        'You press the navigation button two times, pushing two times to the same route.\n\n' +
          'The last dispatch was canceled. \n\n' +
          'If the call was intended, you can add an exception in redux routing.'
      );
      return state || {};
    }
  }
  return RootNavigator.router.getStateForAction(action, state);
};

const appReducer = combineReducers({
  nav: routerReducer,
});

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => appReducer(state, action);

export type StateType = {
  nav: NavigationState,
};

export default rootReducer;
