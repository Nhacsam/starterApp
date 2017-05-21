// @flow
import { NavigationActions } from 'react-navigation';
import { take, takeEvery } from 'redux-saga/effects';

import { RootNavigator } from 'starterApp/src/Scenes';

import type { NavigationState, NavigationAction } from 'react-navigation';

// ACTION CREATORS
export const reset = (routeName: string) => {
  // @see https://github.com/react-community/react-navigation/issues/1127
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })],
  });
  return resetAction;
};

// REDUCER
export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  if (action.type === 'Navigation/NAVIGATE') {
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

// EFFECTS
const generateActionPageEnterMatcherFunction = (routeName: string) => (
  action: NavigationAction
): boolean => {
  if (action.type !== 'Navigation/NAVIGATE') {
    return false;
  }
  return action.routeName === routeName;
};

export const takePageEnter = (routeName: string) =>
  take(generateActionPageEnterMatcherFunction(routeName));

export const takeEveryPageEnter = (routeName: string, saga: Function, ...args: *) =>
  takeEvery(generateActionPageEnterMatcherFunction(routeName), saga, ...args);
