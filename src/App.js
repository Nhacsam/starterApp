// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Scenes from './Scenes';

import createStore from './modules/store';

class App extends Component {
  state = {
    store: null,
  };

  componentDidMount() {
    createStore(store => this.setState({ store }));
  }

  render() {
    return this.state.store
      ? <Provider store={this.state.store}>
          <Scenes />
        </Provider>
      : null;
  }
}

export default App;
