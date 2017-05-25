// @flow
import React, { Component } from 'react';

import type { NavigationTabScreenOptions } from 'react-navigation';
import type { UserType } from 'modelDefinition';

import { Page, ProfileHeader, ButtonCard } from 'starterApp/src/components';
import I18n from 'starterApp/src/lib/i18n';

class Home extends Component {
  props: PropsType;

  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('account.title'),
  };

  render() {
    return (
      <Page noPadding noNavBar>
        <ProfileHeader
          user={this.props.currentUser}
          onPress={() => this.props.navigation.navigate('editAccount')}
        />
        <ButtonCard onPress={() => this.props.logout()} text={I18n.t('account.logout')} />
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  logout: Function,
  currentUser: UserType,
};

export default Home;
