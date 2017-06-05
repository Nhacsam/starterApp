// @flow
import React, { Component } from 'react';
import { FlatList } from 'react-native';

import type { TvShowType } from 'modelDefinition';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page, LoadingPage, TvShowListItem } from 'components';
import I18n from 'lib/i18n';

type Props = {
  navigation: any,
  tvShows: TvShowType[],
  refresh: () => {},
  refreshing: boolean,
  fetching: boolean,
  onSelect: (id: number) => {},
};

class Home extends Component<void, Props, void> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: I18n.t('home.title'),
  };

  render() {
    const { fetching, refreshing, tvShows } = this.props;

    if (fetching && !refreshing && !tvShows.length) {
      return <LoadingPage />;
    }

    return (
      <Page noPadding>
        <FlatList
          style={{ flex: 1 }}
          data={tvShows}
          renderItem={({ item }) => (
            <TvShowListItem tvShow={item} onPress={() => this.props.onSelect(item.id)} />
          )}
          initialNumToRender={4}
          keyExtractor={tvShow => tvShow.id}
          onRefresh={this.props.refresh}
          refreshing={refreshing}
        />
      </Page>
    );
  }
}

export default Home;
