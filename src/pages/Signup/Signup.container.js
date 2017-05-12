// @flow
import { connect } from 'react-redux';
import Signup from './Signup';

import {
  register,
  registeringSelector,
  registeringFailureSelector,
} from 'starterApp/src/modules/User';

const mapStateToProps = state => ({
  saving: registeringSelector(state),
  failure: registeringFailureSelector(state),
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
