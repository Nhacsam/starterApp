// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

import theme from 'starterApp/src/theme';

class Button extends PureComponent {
  static defaultProps: PropsTypes = {
    onPress: () => {},
    fetching: false,
  };

  props: PropsTypes;

  render() {
    let content;
    if (this.props.fetching) {
      content = <ActivityIndicator color={theme.colors.overPrimary} />;
    } else if (this.props.text) {
      content = (
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text.toUpperCase()}</Text>
      );
    } else {
      content = this.props.children;
    }

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.container, this.props.containerStyle]}
        activeOpacity={0.7}
      >
        <View style={[styles.button, this.props.style]}>
          {content}
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
  text?: string,
  onPress: () => void,
  children?: React.Element<*>,
  style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  textStyle?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  containerStyle?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  fetching: boolean,
};

export default Button;
