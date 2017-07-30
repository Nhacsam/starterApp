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
  declare var addNavigationHelpers: Function;
  declare var HeaderBackButton: React.Component;
  declare var Header: React.Component;

  declare type NavigationDispatch<A> = (action: A) => boolean;

  declare type NavigationParams = {
    [key: string]: mixed,
  };

  declare type NavigationNavigateAction = {
    type: 'Navigation/NAVIGATE',
    routeName: string,
    params?: NavigationParams,

    // The action to run inside the sub-router
    action?: NavigationNavigateAction,
  };

  declare type NavigationBackAction = {
    type: 'Navigation/BACK',
    key?: ?string,
  };

  declare type NavigationSetParamsAction = {
    type: 'Navigation/SET_PARAMS',

    // The key of the route where the params should be set
    key: string,

    // The new params to merge into the existing route params
    params?: NavigationParams,
  };

  declare type NavigationInitAction = {
    type: 'Navigation/INIT',
    params?: NavigationParams,
  };

  declare type NavigationResetAction = {
    type: 'Navigation/RESET',
    index: number,
    key?: ?string,
    actions: Array<NavigationNavigateAction>,
  };

  declare type NavigationUriAction = {
    type: 'Navigation/URI',
    uri: string,
  };

  declare type NavigationStackAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction
    | NavigationSetParamsAction
    | NavigationResetAction;

  declare type NavigationTabAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction;

  declare type NavigationAction =
    | NavigationInitAction
    | NavigationStackAction
    | NavigationTabAction;

  declare type NavigationScreenProp = {
    state: NavigationState,
    dispatch: NavigationDispatch<NavigationAction>,
    goBack: (routeKey?: ?string) => boolean,
    navigate: (routeName: string, params?: NavigationParams, action?: NavigationAction) => boolean,
    setParams: (newParams: NavigationParams) => boolean,
  };

  declare type NavigationState = {
    /**
   * Index refers to the active child route in the routes array.
   */
    index: number,
    routes: Array<NavigationRoute>,
  };

  declare type NavigationRoute = NavigationLeafRoute | NavigationStateRoute;

  declare type NavigationLeafRoute = {
    /**
   * React's key used by some navigators. No need to specify these manually,
   * they will be defined by the router.
   */
    key: string,
    /**
   * For example 'Home'.
   * This is used as a key in a route config when creating a navigator.
   */
    routeName: string,
    /**
   * Path is an advanced feature used for deep linking and on the web.
   */
    path?: string,
    /**
   * Params passed to this route when navigating to it,
   * e.g. `{ car_id: 123 }` in a route that displays a car.
   */
    params?: NavigationParams,
  };

  declare type NavigationStateRoute = {
    ...$Exact<NavigationLeafRoute>,
    index: number,
    routes: Array<NavigationRoute>,
  };

  declare type NavigationScreenConfig = Object;
  declare type Style = Object;
}
