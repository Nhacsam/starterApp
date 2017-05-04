const colors = {
  primary: '#05A5D1',
  lightText: '#FAFAFA',
  background: '#F5FCFF',
  darkGray: '#333333',

  overPrimary: 'white',
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
  },
};
