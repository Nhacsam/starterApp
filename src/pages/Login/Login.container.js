// @flow
import { connect } from 'react-redux';
import Login from './Login';

import { login } from 'starterApp/src/modules/Auth';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
