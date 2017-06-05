// @flow
import { NavigationActions } from 'react-navigation';
import { takeEvery } from 'redux-saga/effects';

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

// getPathAndParamsForState
// REDUCER
export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  const router = RootNavigator.router;
  const nextState = router.getStateForAction(action, state);
  if (action.type === 'Navigation/NAVIGATE') {
    const currentPath = router.getPathAndParamsForState(state).path;
    const nextPath = router.getPathAndParamsForState(nextState).path;
    if (currentPath == nextPath) {
      console.warn(
        'You press the navigation button two times, pushing two times to the same route.\n\n' +
          'The last dispatch was canceled. \n\n' +
          'If the call was intended, you can add an exception in redux routing.'
      );
      return state || {};
    }
  }
  return nextState;
};

const pathChanged = (path: string) => ({
  type: 'CustomNavigation/PATH_CHANGED',
  payload: {
    path,
  },
});

type CustomNavigationAction =
  | NavigationAction
  | {
      type: 'CustomNavigation/PATH_CHANGED',
      payload: {
        path: string,
      },
    };

export const pageChangedEmitterMiddleware = (store: any) => (next: Function) => (
  action: CustomNavigationAction
) => {
  if (!action.type.startsWith('Navigation/')) {
    return next(action);
  }
  const prevState = store.getState();
  const prevPath = RootNavigator.router.getPathAndParamsForState(prevState.nav).path;

  const result = next(action);

  const nextState = store.getState();
  const nextPath = RootNavigator.router.getPathAndParamsForState(nextState.nav).path;

  if (nextPath !== prevPath) {
    setTimeout(() => {
      store.dispatch(pathChanged(nextPath));
    });
  }

  return result;
};

export const takeEveryPathEnter = (path: string, saga: Function, ...args: *) => {
  const pathChangedMatcher = action =>
    action.type === 'CustomNavigation/PATH_CHANGED' && path === action.payload.path;
  return takeEvery(pathChangedMatcher, saga, ...args);
};
