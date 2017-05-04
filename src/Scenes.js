// @flow
import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator, HeaderBackButton } from 'react-navigation';

import theme from './theme';
import * as Pages from './pages';

const onAndroid = options => (Platform.OS === 'ios' ? undefined : options);

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
            tintColor={onAndroid(theme.colors.overPrimary)}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'signup',
    navigationOptions: {
      headerTintColor: onAndroid(theme.colors.overPrimary),
      headerStyle: {
        backgroundColor: onAndroid(theme.colors.primary),
      },
    },
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
      style: onAndroid({
        backgroundColor: theme.colors.primary,
      }),
    },
  }
);

const DashboardStack = StackNavigator(
  {
    dashboardTabs: {
      screen: DashboardTab,
    },
  },
  {
    initialRouteName: 'dashboardTabs',
    navigationOptions: {
      headerTintColor: onAndroid(theme.colors.overPrimary),
      headerStyle: {
        backgroundColor: onAndroid(theme.colors.primary),
        elevation: 0,
      },
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
      screen: DashboardStack,
    },
  },
  {
    initialRouteName: 'landing',
    headerMode: 'none',
  }
);

export default RootNavigator;
