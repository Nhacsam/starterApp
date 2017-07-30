// @flow
import React, { Component } from 'react';

import type { UserType } from 'modelDefinition';

import { Page, ProfileHeader, ButtonCard } from 'starterApp/src/components';
import I18n from 'starterApp/src/lib/i18n';

type Props = {
  navigation: any,
  logout: Function,
  currentUser: UserType,
};

class Account extends Component<void, Props, void> {
  render() {
    return (
      <Page noPadding>
        <ProfileHeader
          user={this.props.currentUser}
          onPress={() => this.props.navigation.navigate('editAccount')}
        />
        <ButtonCard onPress={() => this.props.logout()} text={I18n.t('account.logout')} />
      </Page>
    );
  }
}

export default Account;
