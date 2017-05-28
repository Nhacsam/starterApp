/**
 * @providesModule theme
 */
const colors = {
  primary: '#1565c0',
  secondary: '#e64a19',
  lightText: '#FAFAFA',
  background: '#eeeeee',

  darkGray: '#333333',
  gray: '#777777',
  grayLight: '#999999',
  grayLighter: '#AAAAAA',
  extraLightGray: '#DDDDDD',

  inputBackground: 'white',

  overPrimary: 'white',
  error: '#FF4444',
};

export default {
  colors,
  images: {
    landing: require('./images/landing.jpg'),
    logo: require('./images/logo.png'),
    defaultUserImage: require('./images/default-user-image.png'),
  },
  fonts: {
    pageTitle: {
      fontSize: 20,
      color: colors.darkGray,
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
    button: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.darkGray,
    },
    placeholder: {
      color: colors.gray,
    },
    secondaryFlatButton: {
      color: colors.extraLightGray,
      fontWeight: '400',
    },
    input: {
      color: colors.darkGrey,
    },
    error: {
      color: colors.error,
      fontSize: 13,
    },
    normalText: {
      fontSize: 13,
    },
    cardName: {
      fontSize: 18,
      fontWeight: '700',
    },
  },
  defaultPadding: 32,
};
