// @flow
import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation';
import type { NavigationTabScreenOptions } from 'react-navigation';

import { Page, ProfileHeader, ButtonCard } from 'starterApp/src/components';
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

type PropsType = {
  navigation: any,
};

export default Home;
