const colors = {
  primary: '#05A5D1',
  lightText: '#FAFAFA',
  background: '#F5FCFF',
  darkGray: '#333333',
  gray: '#777777',
  grayLight: '#999999',
  grayLighter: '#AAAAAA',

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
    input: {
      color: colors.darkGrey,
    },
  },
};
