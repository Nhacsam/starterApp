// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import theme from 'starterApp/src/theme';

import Button from './Button';

class SecondaryFlatButton extends Component {
  render() {
    return <Button style={styles.button} textStyle={styles.textStyle} {...this.props} />;
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    ...theme.fonts.secondaryFlatButton,
  },
});

export default SecondaryFlatButton;
