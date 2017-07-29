import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import theme from 'starterApp/src/theme';

class Page extends Component {
  props: PropTypes;

  render() {
    const viewProps = {
      style: [
        styles.page,
        {
          paddingTop: this.props.noNavBar ? 0 : 16,
          paddingHorizontal: this.props.noPadding ? 0 : 32,
          backgroundColor: this.props.backgroundColor,
        },
        this.props.style,
      ],
    };
    return (
      <View {...viewProps}>
        {this.props.backgroundImage &&
          <Image source={this.props.backgroundImage} style={styles.image} resizeMode="cover" />}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

type PropTypes = {
  children: React.Element<*>,
  noPadding: boolean,
  noNavBar: boolean,
  backgroundColor: string,
  style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
  backgroundImage?: any,
};

Page.defaultProps = {
  children: null,
  noPadding: false,
  noNavBar: false,
  backgroundColor: theme.colors.background,
};

export default Page;
