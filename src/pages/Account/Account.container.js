// @flow
import { connect } from 'react-redux';
import Account from './Account';

import { logout } from 'starterApp/src/modules/Auth';
import { currentUserSelector } from 'starterApp/src/modules/User';

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
