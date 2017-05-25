// @flow
import React, { Component } from 'react';
import { StyleSheet, InteractionManager } from 'react-native';

import { Page, TextInput, NavDoneButton } from 'components';
import type { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';

type Props = {
  send: (value: string) => {},
  navigation: NavigationScreenProp,
  initialValue: string,
  type: string,
  updateValue: Function,
};

class SingleInputForm extends Component<void, Props, void> {
  input: ?TextInput;

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
    InteractionManager.runAfterInteractions(() => this.input && this.input.focus());
  }

  render() {
    return (
      <Page>
        <TextInput
          containerStyle={styles.input}
          onSubmitEditing={() => this.props.send('')}
          returnKeyType="send"
          ref={(ref: TextInput) => (this.input = ref)}
          defaultValue={this.props.initialValue}
          type={this.props.type}
          onChangeText={value => this.props.updateValue(value)}
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
