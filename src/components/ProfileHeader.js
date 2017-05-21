// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';
import type { UserType } from 'modelDefinition';

import { Page } from 'starterApp/src/components';
import theme from 'starterApp/src/theme';

class ProfileHeader extends Component {
  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={theme.images.defaultUserImage} style={styles.userImage} />
          {!user &&
            <View style={styles.imageOverlay}>
              <ActivityIndicator style={{ alignSelf: 'center' }} color="white" />
            </View>}
        </View>
        {user &&
          <View>
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  imageContainer: {
    marginHorizontal: Page.DEFAULT_PADDING,
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    color: 'white',
    marginVertical: 3,
    fontSize: 18,
  },
  email: {
    color: 'white',
    opacity: 0.9,
    marginVertical: 3,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    height: 70,
    width: 70,
    borderRadius: 35,

    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
type PropTypes = {
  user: ?UserType,
};

export default ProfileHeader;
