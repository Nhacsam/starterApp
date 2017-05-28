// @flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import type { TvShowType } from 'modelDefinition';

import type { NavigationScreenConfig, NavigationScreenProp } from 'react-navigation';
import { Page, LoadingPage, TvShowListItem } from 'components';
import I18n from 'lib/i18n';
import theme from 'theme';

type Props = {
  navigation: any,
  tvShow: TvShowType,
  fetching: boolean,
};

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 200;

class TvShowDetail extends Component<void, Props, void> {
  static navigationOptions: NavigationScreenConfig = ({ navigation, navigationOptions }) => {
    const { state } = navigation;
    return {
      title: state.params ? state.params.title : '',
      headerTintColor: 'white',
      headerStyle: {
        ...navigationOptions.headerStyle,
        backgroundColor: 'transparent',
      },
    };
  };
  _setTitle() {
    this.props.navigation.setParams({
      title: this.props.tvShow.name,
    });
  }
  _unsetTitle() {
    this.props.navigation.setParams({
      title: '',
    });
  }

  componentDidMount() {
    this._unsetTitle();
  }

  render() {
    const { fetching, tvShow } = this.props;
    const image = { uri: `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}` };

    return (
      <Page noPadding style={{ marginTop: -Header.HEIGHT }}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          overlayColor={theme.colors.darkGray}
          minOverlayOpacity={0.6}
          maxOverlayOpacity={0.9}
          fadeOutForeground
          childrenStyle={{ backgroundColor: theme.colors.background }}
          renderHeader={() => <Image source={image} style={styles.image} />}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{tvShow.name}</Text>
            </View>
          )}
        >
          <TriggeringView
            style={styles.section}
            onBeginHidden={() => this._setTitle()}
            onDisplay={() => this._unsetTitle()}
          >
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionContent}>{tvShow.overview}</Text>
            {tvShow.genres &&
              <Text style={styles.genres}>
                {tvShow.genres.reduce(
                  (res, genre, index) => `${res}${index > 0 ? ', ' : ''}${genre.name}`,
                  ''
                )}
              </Text>}
          </TriggeringView>
        </HeaderImageScrollView>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  section: {},
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  sectionContent: {
    backgroundColor: 'white',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'justify',
  },
  genres: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 20,
    textAlign: 'right',
    color: theme.colors.gray,
    fontSize: 12,
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});

export default TvShowDetail;
