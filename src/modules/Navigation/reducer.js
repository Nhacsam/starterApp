// @flow
import { RootNavigator } from 'starterApp/src/Scenes';
import type { NavigationState, NavigationAction } from 'react-navigation';

// REDUCER
export default function(state: NavigationState, action: NavigationAction): NavigationState {
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
}
