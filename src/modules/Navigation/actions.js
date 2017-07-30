import { NavigationActions } from 'react-navigation';

export const reset = (routeName: string) => {
  // @see https://github.com/react-community/react-navigation/issues/1127
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })],
  });
  return resetAction;
};
