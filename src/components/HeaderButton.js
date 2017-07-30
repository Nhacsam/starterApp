/* @flow */
import React, { PureComponent } from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';

import type { Style } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Touchable from './Touchable';

type Props = {
  onPress?: () => void,
  pressColorAndroid?: ?string,
  headerTitleStyle?: ?Style,
  headerTintColor?: ?string,
  disabled?: boolean,
  icon?: string,
  text?: string,
  children?: *,
};

type DefaultProps = {
  pressColorAndroid: ?string,
  headerTintColor: ?string,
  disabled: boolean,
};

class NavDoneButton extends PureComponent<DefaultProps, Props, void> {
  static defaultProps = {
    pressColorAndroid: 'rgba(0, 0, 0, .32)',
    headerTintColor: 'white',
    disabled: false,
  };

  render() {
    const {
      onPress,
      pressColorAndroid,
      icon,
      text,
      headerTitleStyle,
      headerTintColor,
    } = this.props;

    return (
      <Touchable
        onPress={onPress}
        pressColor={pressColorAndroid}
        style={styles.container}
        borderless
        disabled={this.props.disabled}
      >
        {this.props.children
          ? this.props.children
          : <View style={styles.container}>
              <Icon style={styles.icon} name={icon} color={headerTintColor} size={24} />
              {text &&
                <Text
                  style={[styles.title, { color: headerTintColor }, headerTitleStyle]}
                  numberOfLines={1}
                >
                  {text}
                </Text>}
            </View>}
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 17,
    paddingRight: 10,
  },
  icon:
    Platform.OS === 'ios'
      ? {
          marginLeft: 10,
          marginRight: 5,
          marginVertical: 12,
          marginRight: 5,
        }
      : {
          margin: 16,
        },
});

export default NavDoneButton;
