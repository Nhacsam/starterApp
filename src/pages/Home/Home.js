// @flow
import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';

import type { TvShowType } from 'modelDefinition';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page } from 'starterApp/src/components';
import I18n from 'lib/i18n';

type Props = {
  navigation: any,
  tvShows: TvShowType[],
  refresh: () => {},
  refreshing: boolean,
  fetching: boolean,
};

class Home extends Component<void, Props, void> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('home.title'),
  };

  render() {
    return (
      <Page>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.tvShows}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          initialNumToRender={10}
          keyExtractor={tvShow => tvShow.id}
          onRefresh={this.props.refresh}
          refreshing={this.props.refreshing}
        />
      </Page>
    );
  }
}

export default Home;
