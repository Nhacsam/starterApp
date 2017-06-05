// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Page from './Page';
import theme from 'starterApp/src/theme';

class LoadingPage extends Component {
  render() {
    return (
      <Page>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default LoadingPage;
