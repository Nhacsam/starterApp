// @flow
import React, { PureComponent } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import HeartIcon from './HeartIcon';

import theme from 'starterApp/src/theme';

type Props = {
  imageUrl: string,
  name: string,
  texts: string[],
};

type DefaultProps = {
  texts: string[],
};

class ListItem extends PureComponent<DefaultProps, Props, void> {
  static HEIGHT = 150;
  static defaultProps: DefaultProps = {
    texts: [],
  };
  render() {
    const { imageUrl, name } = this.props;
    return (
      <Image style={styles.card} source={{ uri: imageUrl }}>
        <View style={styles.cardOverlay}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            {this.props.texts.map((text, index) => (
              <Text key={index} style={styles.text}>{text}</Text>
            ))}
          </View>
          <View style={styles.iconContainer}>
            <HeartIcon style={styles.icon} />
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    height: ListItem.HEIGHT,
  },
  cardOverlay: {
    height: ListItem.HEIGHT,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#333333dd',
    alignItems: 'stretch',
    padding: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    backgroundColor: 'transparent',
    ...theme.fonts.cardName,
  },
  image: {
    width: (ListItem.HEIGHT - 30) * 2 / 3,
    resizeMode: 'contain',
    marginRight: 15,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  text: {
    color: 'white',
    ...theme.fonts.normalText,
  },
});

export default ListItem;
