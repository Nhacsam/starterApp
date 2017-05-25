// @flow
import { connect } from 'react-redux';
import EditAccount from './EditAccount';

import { currentUserSelector } from 'starterApp/src/modules/User';

const mapStateToProps = state => ({
  user: currentUserSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  edit: (name: string, inputType: string) => {
    ownProps.navigation.navigate('singleInputForm');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
