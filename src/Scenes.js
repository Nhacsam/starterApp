// @flow
import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
  HeaderBackButton,
  Header,
} from 'react-navigation';
import { connect } from 'react-redux';

import type { NavigationScreenProp } from 'react-navigation';

import * as Pages from './pages';
import theme from './theme';

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
      navigationOptions: ({ navigationOptions }) => ({
        ...navigationOptions,
        headerStyle: {
          ...navigationOptions.headerStyle,
          elevation: 0,
        },
      }),
    },
    editAccount: {
      screen: Pages.EditAccount,
    },
    singleInputForm: {
      screen: Pages.SingleInputForm,
    },
    tvShowDetail: {
      screen: Pages.TvShowDetail,
    },
  },
  {
    initialRouteName: 'dashboardTabs',
    cardStyle: { marginTop: Header.HEIGHT },
    navigationOptions: {
      headerTintColor: onAndroid(theme.colors.overPrimary),
      headerStyle: {
        backgroundColor: onAndroid(theme.colors.primary),
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
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

class Scenes extends Component {
  props: PropsType;
  navigation: NavigationScreenProp;

  get navigation() {
    return addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
  }

  render() {
    return <RootNavigator navigation={this.navigation} />;
  }
}

type PropsType = {
  nav: Object,
  dispatch: Function,
};

export default connect(state => ({
  nav: state.nav,
}))(Scenes);
