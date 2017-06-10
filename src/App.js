// @flow
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';

import Scenes from './Scenes';

import createStore from './modules/store';
import theme from 'theme';

class App extends Component {
  state = {
    store: null,
  };

  componentDidMount() {
    createStore(store => this.setState({ store }));
  }

  render() {
    return (
      <View style={{ alignSelf: 'stretch', flex: 1 }}>
        <StatusBar backgroundColor={theme.colors.darkenPrimary} barStyle="light-content" />
        {this.state.store
          ? <Provider store={this.state.store}>
              <Scenes />
            </Provider>
          : null}
      </View>
    );
  }
}

export default App;
