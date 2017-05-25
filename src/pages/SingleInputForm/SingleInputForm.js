// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Page, TextInput, NavDoneButton } from 'components';
import type { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';

type Props = {
  send: (value: string) => {},
  navigation: NavigationScreenProp,
};

class SingleInputForm extends Component<void, Props, void> {
  static navigationOptions: NavigationScreenConfig = ({ navigation, navigationOptions }) => {
    const { state } = navigation;
    return {
      headerLeft: (
        <NavDoneButton
          {...navigationOptions}
          onPress={() => state.params.send()}
          disabled={!state.params || !state.params.send}
          text="send"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      send: () => this.props.send(''),
    });
  }

  render() {
    return (
      <Page>
        <TextInput
          containerStyle={styles.input}
          onSubmitEditing={() => this.props.send('')}
          returnKeyType="send"
        />
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 60,
  },
});

export default SingleInputForm;
