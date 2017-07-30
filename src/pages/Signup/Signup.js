// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page, Button, TextInput } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';
import I18n from 'starterApp/src/lib/i18n';

import type { UserCreateFormType } from 'starterApp/src/modules/Model/User';

type Props = {
  navigator: any,
  register: (user: UserCreateFormType) => {},
  saving: boolean,
  failure: boolean,
};

class Signup extends Component<void, Props, UserCreateFormType> {
  lastNameInput: TextInput;
  emailInput: TextInput;
  passwordInput: TextInput;
  state: UserCreateFormType;

  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <TextInput
            type="name"
            placeholder={I18n.t('user.form.firstname')}
            onChangeText={firstName => this.setState({ firstName })}
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.focus()}
          />
          <TextInput
            type="name"
            placeholder={I18n.t('user.form.lastname')}
            onChangeText={lastName => this.setState({ lastName })}
            ref={ref => (this.lastNameInput = ref)}
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            type="email"
            placeholder={I18n.t('user.form.email')}
            onChangeText={email => this.setState({ email })}
            ref={ref => (this.emailInput = ref)}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput
            type="password"
            placeholder={I18n.t('user.form.password')}
            onChangeText={password => this.setState({ password })}
            ref={ref => (this.passwordInput = ref)}
            returnKeyType="send"
            onSubmitEditing={() => this.props.register(this.state)}
          />
          {this.props.failure &&
            <Text style={styles.error}>
              {I18n.t('user.registerFailure')}
            </Text>}
          <Button
            onPress={() => this.props.register(this.state)}
            text={I18n.t('signup.signup')}
            fetching={this.props.saving}
          />
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    textAlign: 'right',
    ...theme.fonts.error,
  },
  title: {
    ...theme.fonts.pageTitle,
  },
});

export default Signup;
