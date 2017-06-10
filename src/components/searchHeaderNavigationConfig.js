// @flow
import React from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import type { NavigationScreenConfig } from 'react-navigation';
import HeaderButton from './HeaderButton';
import theme from 'theme';

const navigationOptions: NavigationScreenConfig = ({ navigation, navigationOptions }) => {
  const { state } = navigation;
  let input;
  return {
    headerLeft: (
      <HeaderButton {...navigationOptions} icon="magnify" onPress={() => input.focus()} />
    ),
    headerRight: <View />,
    headerTitle: (
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref => (input = ref)}
          underlineColorAndroid="transparent"
          style={styles.input}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: theme.colors.extraLightGray,
    flex: 1,
    marginBottom: 7,
    marginHorizontal: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 5,
  },
  input: {
    alignSelf: 'stretch',
    color: theme.colors.overPrimary,
    backgroundColor: 'transparent',
    flex: 1,
    fontSize: 18,
  },
});

export default navigationOptions;
