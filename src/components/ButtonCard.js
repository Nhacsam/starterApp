// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Touchable } from 'components';
import theme from 'theme';

class ButtonCard extends Component {
  render() {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.card}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Icon name="chevron-right" size={30} />
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    minHeight: 55,
    paddingHorizontal: theme.defaultPadding / 2,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...theme.fonts.button,
  },
});
type PropTypes = {
  text: string,
  onPress: ?Function,
};

export default ButtonCard;
