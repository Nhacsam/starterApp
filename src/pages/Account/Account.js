// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { NavigationTabScreenOptions } from 'react-navigation';
import type { UserType } from 'modelDefinition';

import { Page, Button, ProfileHeader } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

class Home extends Component {
  props: PropsType;

  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('account.title'),
  };

  render() {
    return (
      <Page noPadding noNavBar>
        <ProfileHeader user={this.props.currentUser} />
        <View style={styles.container}>
          <Text style={styles.title}>
            {I18n.t('account.text')}
          </Text>
          <Button onPress={() => this.props.logout()} text={I18n.t('account.logout')} />
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
    paddingHorizontal: Page.DEFAULT_PADDING,
  },
  title: {
    ...theme.fonts.pageTitle,
  },
});

type PropsType = {
  navigation: any,
  logout: Function,
  currentUser: UserType,
};

export default Home;
