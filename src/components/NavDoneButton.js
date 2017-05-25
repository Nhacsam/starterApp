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
};

type DefaultProps = {
  pressColorAndroid: ?string,
  headerTintColor: ?string,
  disabled: boolean,
};

class NavDoneButton extends PureComponent<DefaultProps, Props, void> {
  static defaultProps = {
    pressColorAndroid: 'rgba(0, 0, 0, .32)',
    headerTintColor: Platform.select({
      ios: '#037aff',
    }),
    disabled: false,
  };

  render() {
    const { onPress, pressColorAndroid, headerTitleStyle, headerTintColor } = this.props;

    return (
      <Touchable
        onPress={onPress}
        pressColor={pressColorAndroid}
        style={styles.container}
        borderless
        disabled={this.props.disabled}
      >
        <View style={styles.container}>
          <Icon style={styles.icon} name="check" color={headerTintColor} size={24} />
          <Text
            style={[styles.title, { color: headerTintColor }, headerTitleStyle]}
            numberOfLines={1}
          >
            Done
          </Text>
        </View>
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
  icon: Platform.OS === 'ios'
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
