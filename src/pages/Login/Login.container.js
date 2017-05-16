// @flow
import { connect } from 'react-redux';
import Login from './Login';

import { login, sendingLoginSelector, loginFailureSelector } from 'starterApp/src/modules/Auth';

const mapStateToProps = state => ({
  posting: sendingLoginSelector(state),
  failure: loginFailureSelector(state),
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
