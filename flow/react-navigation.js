/* @flow */

import React from 'react';
declare module 'react-navigation' {
  declare var NavigationActions: {
    BACK: string,
    INIT: string,
    NAVIGATE: string,
    RESET: string,
    SET_PARAMS: string,
    URI: string,

    // Action creators
    back: Function,
    init: Function,
    navigate: Function,
    reset: Function,
    setParams: Function,
    uri: Function,
  };

  declare type NavigationScreenOptions = {
    title?: string,
  };

  declare type NavigationTabScreenOptions = NavigationScreenOptions & {
    tabBarIcon?:
      | React.Element<*>
      | ((options: { tintColor: ?string, focused: boolean }) => ?React.Element<*>),
    tabBarLabel?:
      | string
      | React.Element<*>
      | ((options: { tintColor: ?string, focused: boolean }) => ?React.Element<*>),
    tabBarVisible?: boolean,
  };

  declare var StackNavigator: Function;
  declare var TabNavigator: Function;
  declare var HeaderBackButton: React.Component;
}
