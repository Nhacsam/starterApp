// @flow
import React, { Component } from 'react';

import type { NavigationTabScreenOptions } from 'react-navigation';
import type { UserType } from 'modelDefinition';

import { Page, ButtonCard } from 'components';
import I18n from 'lib/i18n';

class EditAccount extends Component {
  props: PropTypes;

  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('editAccount.title'),
  };

  render() {
    const { user, edit } = this.props;
    return (
      <Page>
        <ButtonCard
          onPress={() => edit('userEmail', user.email, 'email')}
          text={I18n.t('user.form.email')}
          canHaveValue
          value={user.email}
        />
        <ButtonCard
          onPress={() => edit('userPassword', '', 'password')}
          text={I18n.t('user.form.password')}
          canHaveValue
          value="******"
        />
        <ButtonCard
          onPress={() => edit('userFirstName', user.firstName, 'name')}
          text={I18n.t('user.form.firstname')}
          canHaveValue
          value={user.firstName}
        />
        <ButtonCard
          onPress={() => edit('userLastName', user.lastName, 'name')}
          text={I18n.t('user.form.lastname')}
          canHaveValue
          value={user.lastName}
        />
      </Page>
    );
  }
}

type PropTypes = {
  user: UserType,
  edit: (name: string, initialValue: string, inputType: string) => {},
};

export default EditAccount;
