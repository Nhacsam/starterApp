// @flow
import { NavigationActions } from 'react-navigation';
import { Keyboard } from 'react-native';

const dismissKeyboard = ({ getState }: { getState: Function }) => (next: Function) => (
  action: any
) => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    Keyboard.dismiss();
  }
  return result;
};

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default dismissKeyboard;
