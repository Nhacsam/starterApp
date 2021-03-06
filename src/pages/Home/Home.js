// @flow
import React, { Component } from 'react';
import { FlatList } from 'react-native';

import type { TvShowType } from 'modelDefinition';

import type { NavigationTabScreenOptions } from 'react-navigation';
import { Page, LoadingPage, TvShowListItem } from 'components';
import searchHeaderNavigationConfig from 'starterApp/src/components/searchHeaderNavigationConfig';

export type Props = {
  navigation: any,
  tvShows: TvShowType[],
  refresh: () => {},
  fetchTvShows: () => {},
  refreshing: boolean,
  fetching: boolean,
  onSelect: (id: number) => {},
  search: (text: string) => {},
};

class Home extends Component<void, Props, void> {
  static navigationOptions: NavigationTabScreenOptions = searchHeaderNavigationConfig;

  componentWillMount() {
    this.props.navigation.setParams({
      onSearchTextChange: this.props.search,
    });
  }

  componentDidMount() {
    this.props.fetchTvShows();
  }

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
          renderItem={({ item }) =>
            <TvShowListItem tvShow={item} onPress={() => this.props.onSelect(item.id)} />}
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
