import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import theme from 'starterApp/src/theme';

class Page extends Component {
  props: PropTypes;
  static DEFAULT_PADDING = 32;

  render() {
    const viewProps = {
      style: [
        styles.page,
        {
          paddingHorizontal: this.props.noPadding ? 0 : Page.DEFAULT_PADDING,
          backgroundColor: this.props.backgroundColor,
          width: Dimensions.get('window').width,
        },
        this.props.style,
      ],
      children: this.props.children,
    };

    if (this.props.backgroundImage) {
      return <Image source={this.props.backgroundImage} {...viewProps} />;
    }

    return <View {...viewProps} />;
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

type PropTypes = {
  children: React.Element<*>,
  noPadding: boolean,
  backgroundColor: string,
  style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  backgroundImage?: any,
};

Page.defaultProps = {
  children: null,
  noPadding: false,
  backgroundColor: theme.colors.background,
};

export default Page;
