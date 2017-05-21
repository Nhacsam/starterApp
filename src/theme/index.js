const colors = {
  primary: '#1565c0',
  lightText: '#FAFAFA',
  background: '#e3f2fd',

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
  },
  fonts: {
    pageTitle: {
      fontSize: 20,
      color: colors.darkGray,
      textAlign: 'center',
      backgroundColor: 'transparent',
    },
    button: {
      fontSize: 13,
      fontWeight: '700',
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
  },
};
