// @flow
import { connect } from 'react-redux';
import EditAccount from './EditAccount';

import { currentUserSelector } from 'modules/User';
import { startEdit } from 'modules/SingleInputForm';

const mapStateToProps = state => ({
  user: currentUserSelector(state),
});

const mapDispatchToProps = {
  edit: startEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
