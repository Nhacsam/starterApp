// @flo
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page, Button, TextInput } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

class Home extends Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Singup',
  };

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
      <Page>
        <View style={styles.container}>
          <TextInput type="name" placeholder="First name" />
          <TextInput type="name" placeholder="Last name" />
          <TextInput type="email" placeholder="Email" />
          <TextInput type="password" placeholder="Password" />

          <Button onPress={() => this._goToHomePage()} text="Sign up" />
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...theme.fonts.pageTitle,
  },
});

type PropsType = {
  navigator: any,
};

export default Home;
