/* @flow */

import React, { PureComponent } from 'react';

import type { Style } from 'react-navigation';

import HeaderButton from './HeaderButton';

type Props = {
  onPress?: () => void,
  pressColorAndroid?: ?string,
  headerTitleStyle?: ?Style,
  headerTintColor?: ?string,
  disabled?: boolean,
};

class NavDoneButton extends PureComponent<void, Props, void> {
  render() {
    return <HeaderButton {...this.props} icon="check" text="Done" />;
  }
}
export default NavDoneButton;
