// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Page, Button } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

class Home extends Component {
  props: PropsType;

  _logout() {
    // @see https://github.com/react-community/react-navigation/issues/1127
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'landing' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.title}>
            This is the Account page
          </Text>
          <Button onPress={() => this._logout()}>
            Logout
          </Button>
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.fonts.pageTitle,
  },
});

type PropsType = {
  navigation: any,
};

export default Home;
