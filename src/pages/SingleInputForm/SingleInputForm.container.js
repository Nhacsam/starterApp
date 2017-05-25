// @flow
import { connect } from 'react-redux';
import SingleInputForm from './SingleInputForm';
import {
  initialValueSelector,
  inputTypeSelector,
  updateValue,
  confirm,
} from 'modules/SingleInputForm';

const mapStateToProps = (state, ownProps) => ({
  initialValue: initialValueSelector(state, ownProps.navigation.state.params.name),
  type: inputTypeSelector(state, ownProps.navigation.state.params.name),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const formName = ownProps.navigation.state.params.name;
  return {
    updateValue: value => dispatch(updateValue(formName, value)),
    send: () => dispatch(confirm(formName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleInputForm);
