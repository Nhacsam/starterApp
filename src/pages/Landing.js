// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Page, Button } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

class Landing extends Component {
  props: PropsType;

  render() {
    return (
      <Page style={styles.content} backgroundImage={theme.images.landing}>
        <View style={styles.imageContainer}>
          <Image source={theme.images.logo} />
        </View>
        <View>
          <Button onPress={() => this.props.navigation.navigate('login')} text="Login" />
          <Button onPress={() => this.props.navigation.navigate('signup')} text="Register" />
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
  },
  imageContainer: {
    alignItems: 'center',
  },
});

type PropsType = {
  navigation: any,
};

export default Landing;
