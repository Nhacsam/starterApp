// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-navigation';
import type { HeaderProps } from 'react-navigation';

type Props = HeaderProps;
type State = {
  searching: boolean,
};

class SearchHeader extends Component<void, Props, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  render() {
    return <Header {...this.props} />;
  }
}

const styles = StyleSheet.create({});

export default SearchHeader;
