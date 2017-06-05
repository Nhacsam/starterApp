// @flow
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import type { TvShowType } from 'modelDefinition';

import theme from 'theme';

import ListItem from './ListItem';
import Touchable from './Touchable';

type Props = {
  tvShow: TvShowType,
  onPress: Function,
};

class TvShowListItem extends PureComponent<void, Props, void> {
  render() {
    const show = this.props.tvShow;
    return (
      <Touchable
        style={styles.container}
        useForeground
        onPress={this.props.onPress}
        pressColor={theme.colors.background}
      >
        <ListItem
          imageUrl={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          name={show.name}
        />
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default TvShowListItem;
