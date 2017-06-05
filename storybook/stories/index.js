import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';

import { ListItem } from 'components';
storiesOf('ListItem', module)
  .addDecorator(story => (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#aaaaaa', padding: 10 }}>
      {story()}
    </View>
  ))
  .add('normal', () => (
    <ListItem
      imageUrl="https://image.tmdb.org/t/p/w640/u7ZpBy8eR50ixjumnkQnCUEbpRa.jpg"
      name="Doctor Who"
    />
  ))
  .add('Very long name', () => (
    <ListItem
      imageUrl="https://image.tmdb.org/t/p/w640/u7ZpBy8eR50ixjumnkQnCUEbpRa.jpg"
      name="A super Long Nam efor a Tv Show That should be good"
    />
  ))
  .add('Very long name and texts', () => (
    <ListItem
      imageUrl="https://image.tmdb.org/t/p/w640/u7ZpBy8eR50ixjumnkQnCUEbpRa.jpg"
      name="A super Long Nam efor a Tv Show That should be good"
      texts={['S10E03', 'Next Episode: Wen 13 March', '23820 followers']}
    />
  ))
  .add('With texts', () => (
    <ListItem
      imageUrl="https://image.tmdb.org/t/p/w640/u7ZpBy8eR50ixjumnkQnCUEbpRa.jpg"
      name="Doctor Who"
      texts={['S10E03', 'Next Episode: Wen 13 March', '23820 followers']}
    />
  ));
