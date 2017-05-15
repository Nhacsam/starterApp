// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { Page, Button, TextInput, SecondaryFlatButton } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

class Login extends Component {
  props: PropsType;
  state: StateType;
  password: TextInput;

  constructor(props) {
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

          <Button onPress={() => this.props.sendLogin()} text={I18n.t('login.login')} />
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
});

type PropsType = {
  navigation: any,
  login: Function,
};

type StateType = {
  email: string,
  password: string,
};

export default Login;
