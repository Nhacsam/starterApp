// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

console.log(theme, 'theme');
class Home extends Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Home',
  };

  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.title}>
            This is the home page
          </Text>
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
