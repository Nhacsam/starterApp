// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import theme from 'starterApp/src/theme';

class Button extends PureComponent {
  static defaultProps: PropsTypes = {
    children: '',
    onPress: () => {},
  };

  props: PropsTypes;

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <View style={styles.button}>
          <Text style={[styles.text]}>{this.props.children.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    marginVertical: 8,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  text: {
    ...theme.fonts.button,
    color: theme.colors.overPrimary,
    textAlign: 'center',
  },
});

type PropsTypes = {
  children: string,
  onPress: () => void,
};

export default Button;
