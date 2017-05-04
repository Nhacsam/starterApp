// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Page, Button } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

class Login extends Component {
  props: PropsType;

  _goToHomePage() {
    // @see https://github.com/react-community/react-navigation/issues/1127
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'dashboard' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Page backgroundImage={theme.images.landing}>
        <View>
          <Button onPress={() => this._goToHomePage()} text="Login" />
          <Button
            onPress={() => this.props.navigation.navigate('signup')}
            text="Don't have an account"
          />
        </View>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
};

export default Login;
