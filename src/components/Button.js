// @flow

import React, { PureComponent } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import Touchable from './Touchable';

import theme from 'theme';

type Props = {
  text?: string,
  onPress: () => void,
  children?: React.Element<*>,
  style?: any,
  textStyle?: any,
  fetching?: ?boolean,
  borderless: boolean,
};

type DefaultProps = {
  onPress: () => void,
  fetching: boolean,
};

class Button extends PureComponent<DefaultProps, Props, void> {
  static defaultProps: DefaultProps = {
    onPress: () => {},
    fetching: false,
  };
  props: Props;

  render() {
    const { style, children, text, textStyle, fetching, ...rest } = this.props;
    let content;
    if (fetching) {
      content = <ActivityIndicator color={theme.colors.overPrimary} />;
    } else if (text) {
      content = (
        <Text style={[styles.text, textStyle]}>
          {text.toUpperCase()}
        </Text>
      );
    } else {
      content = children;
    }

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

export default Button;
