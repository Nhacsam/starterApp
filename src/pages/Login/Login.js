// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Page, Button, TextInput, SecondaryFlatButton } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

type Props = {
  navigation: any,
  login: Function,
  posting: boolean,
  failure: boolean,
};

type State = {
  email: string,
  password: string,
};

class Login extends Component<void, Props, State> {
  password: TextInput;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  sendLogin = () => {
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <Page backgroundImage={theme.images.landing} style={styles.page}>
        <View>
          <TextInput
            type="email"
            placeholder={I18n.t('user.form.email')}
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            type="password"
            placeholder={I18n.t('user.form.password')}
            onChangeText={password => this.setState({ password })}
            ref={ref => (this.password = ref)}
            returnKeyType="send"
            onSubmitEditing={this.sendLogin}
          />

          {this.props.failure &&
            <Text style={styles.error}>
              {I18n.t('login.failure')}
            </Text>}
          <Button
            onPress={() => this.sendLogin()}
            text={I18n.t('login.login')}
            fetching={this.props.posting}
          />
          <SecondaryFlatButton
            onPress={() => this.props.navigation.navigate('signup')}
            text={I18n.t('login.signup')}
          />
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
  },
  error: {
    textAlign: 'right',
    backgroundColor: 'transparent',
    ...theme.fonts.error,
  },
});

export default Login;
