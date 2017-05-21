// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationActions } from 'react-navigation';
import type { NavigationTabScreenOptions } from 'react-navigation';
import type { UserType } from 'modelDefinition';

import { Page, Button, ProfileHeader, ButtonCard } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

class Home extends Component {
  props: PropsType;

  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('account.title'),
  };

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
      <Page noPadding noNavBar>
        <ProfileHeader user={{ firstName: 'John', lastName: 'Doe' }} />
        <ButtonCard onPress={() => this._logout()} text={I18n.t('account.logout')} />
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
