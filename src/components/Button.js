// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import Touchable from './Touchable';

import theme from 'starterApp/src/theme';

class Button extends PureComponent {
  static defaultProps: PropsTypes = {
    onPress: () => {},
  };

  props: PropsTypes;

  render() {
    const { style, text, textStyle, children, ...rest } = this.props;
    const content = text
      ? <Text style={[styles.text, textStyle]}>
          {text.toUpperCase()}
        </Text>
      : children;

    return (
      <Touchable style={[styles.button, style]} {...rest}>
        {content}
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 8,
  },
  text: {
    ...theme.fonts.button,
    color: theme.colors.overPrimary,
    textAlign: 'center',
  },
});

type PropsTypes = {
  text?: string,
  onPress: () => void,
  children?: React.Element<*>,
  style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  textStyle?: StyleSheet.Styles | Array<StyleSheet.Styles>,
};

export default Button;
