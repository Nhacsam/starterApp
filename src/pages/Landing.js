// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Page, Button, SecondaryFlatButton } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

type Props = {
  navigation: any,
};

class Landing extends Component<void, Props, void> {
  props: PropsType;

  render() {
    return (
      <Page style={styles.content} backgroundImage={theme.images.landing}>
        <View style={styles.imageContainer}>
          <Image source={theme.images.logo} />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('signup')}
            text={I18n.t('landing.register')}
          />
          <SecondaryFlatButton
            onPress={() => this.props.navigation.navigate('login')}
            text={I18n.t('landing.login')}
          />
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

export default Landing;
