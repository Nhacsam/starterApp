// @flow
import { connect } from 'react-redux';
import SingleInputForm from './SingleInputForm';

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  send: () => {
    ownProps.navigation.goBack();
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SingleInputForm);
