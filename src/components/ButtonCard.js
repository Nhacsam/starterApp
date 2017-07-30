// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Touchable } from 'components';
import theme from 'theme';

type Props = {
  text?: string,
  value?: string,
  onPress?: ?Function,
  canHaveValue?: boolean,
};

class ButtonCard extends PureComponent<void, Props, void> {
  render() {
    const { canHaveValue, value } = this.props;
    return (
      <Touchable onPress={this.props.onPress} style={styles.card}>
        <View style={[styles.contentContainer, canHaveValue && styles.canHaveValueContainer]}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
          {value
            ? <Text style={styles.value}>
                {value}
              </Text>
            : <Icon
                name="chevron-right"
                size={30}
                color={canHaveValue ? theme.colors.secondary : theme.colors.darkGray}
              />}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    paddingHorizontal: theme.defaultPadding / 2,
  },
  contentContainer: {
    borderBottomWidth: 1,
    borderColor: theme.colors.grayLighter,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 55,
  },
  canHaveValueContainer: {
    minHeight: 45,
  },
  text: {
    ...theme.fonts.button,
  },
  value: {
    ...theme.fonts.button,
    color: theme.colors.secondary,
    fontWeight: '400',
  },
});

export default ButtonCard;
