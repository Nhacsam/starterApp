// @flo
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page, Button, TextInput } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

class Home extends Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('signup.title'),
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
          <TextInput type="name" placeholder={I18n.t('user.form.firstname')} />
          <TextInput type="name" placeholder={I18n.t('user.form.lastname')} />
          <TextInput type="email" placeholder={I18n.t('user.form.email')} />
          <TextInput type="password" placeholder={I18n.t('user.form.password')} />

          <Button onPress={() => this._goToHomePage()} text={I18n.t('signup.signup')} />
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
