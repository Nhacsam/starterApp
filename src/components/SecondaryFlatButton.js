// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import theme from 'theme';

import Button from './Button';

type Props = {
  text?: string,
  onPress: () => void,
  children?: React.Element<*>,
  fetching?: ?boolean,
};

class SecondaryFlatButton extends Component<void, $Shape<Props>, void> {
  render() {
    return (
      <Button
        style={styles.button}
        textStyle={styles.textStyle}
        borderless
        useForeground
        {...this.props}
      />
    );
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
