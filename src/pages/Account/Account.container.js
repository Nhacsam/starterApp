// @flow
import { connect } from 'react-redux';
import Account from './Account';

import { logout } from 'starterApp/src/modules/Auth';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
