// @flow
import React, { Component } from 'react';
import {
  StackNavigator,
  TabNavigator,
  addNavigationHelpers,
  HeaderBackButton,
} from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';

import * as Pages from './pages';

const LandingStack = StackNavigator(
  {
    landing: {
      screen: Pages.Landing,
    },
    login: {
      screen: Pages.Login,
    },
  },
  {
    initialRouteName: 'landing',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
);

const SignUpStack = StackNavigator(
  {
    signup: {
      screen: Pages.Signup,
      navigationOptions: props => ({
        headerLeft: (
          <HeaderBackButton
            onPress={() => {
              props.navigation.goBack(null);
            }}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'signup',
  }
);

const DashboardTab = TabNavigator(
  {
    home: {
      screen: Pages.Home,
    },
    account: {
      screen: Pages.Account,
    },
  },
  {
    initialRouteName: 'home',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: false,
    },
  }
);

export const RootNavigator = StackNavigator(
  {
    landing: {
      screen: LandingStack,
    },
    signup: {
      screen: SignUpStack,
    },
    dashboard: {
      screen: DashboardTab,
    },
  },
  {
    initialRouteName: 'landing',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
);

export default RootNavigator;
