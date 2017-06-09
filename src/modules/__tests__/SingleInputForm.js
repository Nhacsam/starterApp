/*global jasmine*/
import { NavigationActions } from 'react-navigation';
import { put } from 'redux-saga/effects';

import {
  startEdit,
  updateValue,
  startEditSaga,
  confirm,
  initialValueSelector,
  inputTypeSelector,
  valueSelector,
  singleInputReducer,
  singleInputFormSaga,
} from '../SingleInputForm';
import { RootNavigator } from 'starterApp/src/Scenes';

import { expectSaga } from 'redux-saga-test-plan';

import reducers from '../reducers';

describe('SingleInputForm module', () => {
  describe('Integration tests', () => {
    let prevState;

    it('should redirect on the SingleInputForm page', () => {
      const email = 'myemail@j.fr';
      return expectSaga(singleInputFormSaga)
        .withReducer(reducers)
        .dispatch(startEdit('email', email, 'email'))
        .silentRun(1)
        .then(result => {
          const state = result.storeState;
          const { path, params } = RootNavigator.router.getPathAndParamsForState(state.nav);
          expect(path).toBe('dashboard/singleInputForm');
          expect(initialValueSelector(state, params.name)).toBe(email);
          expect(inputTypeSelector(state, params.name)).toBe('email');
          expect(valueSelector(state, 'email')).toBe(email);
          prevState = state;
        });
    });

    it('should change the value', () => {
      const email = 'newEmail@domain.com';
      prevState = reducers(prevState, updateValue('email', email));
      expect(valueSelector(prevState, 'email')).toBe(email);
    });

    it('should go back on confirm', () => {
      return expectSaga(singleInputFormSaga)
        .withReducer(reducers, prevState)
        .dispatch(confirm('email'))
        .silentRun(1)
        .then(result => {
          const state = result.storeState;
          const { path } = RootNavigator.router.getPathAndParamsForState(state.nav);
          expect(path).not.toBe('dashboard/singleInputForm');
        });
    });
  });

  describe('selectors', () => {
    it('should return the initial value', () => {
      const state = {
        singleInputForm: {
          email: {
            type: 'email',
            initialValue: 'bruce@wayne.com',
          },
        },
      };
      expect(initialValueSelector(state, 'email')).toBe('bruce@wayne.com');
    });
    it('should return the input type', () => {
      const state = {
        singleInputForm: {
          email: {
            type: 'email',
            initialValue: 'bruce@wayne.com',
          },
        },
      };
      expect(inputTypeSelector(state, 'email')).toBe('email');
    });
    it('should return the form value', () => {
      const state = {
        singleInputForm: {
          email: {
            value: 'value',
          },
        },
      };
      expect(valueSelector(state, 'email')).toBe('value');
    });
  });

  describe('reducer', () => {
    it('should create a new form', () => {
      expect(singleInputReducer({}, startEdit('userEmail', 'bruce@wayne.com', 'email'))).toEqual({
        userEmail: {
          initialValue: 'bruce@wayne.com',
          value: 'bruce@wayne.com',
          type: 'email',
          name: 'userEmail',
        },
      });
    });

    it('should create a new form', () => {
      expect(singleInputReducer({}, updateValue('userEmail', 'bruce@wayne.com'))).toEqual({
        userEmail: {
          value: 'bruce@wayne.com',
        },
      });
    });
  });

  describe('action creators', () => {
    it('should create a startEdit action', () => {
      expect(startEdit('email', 'bruce@wayne.com', 'email')).toEqual({
        type: 'SINGLE_INPUT_FORM.START_EDIT',
        payload: { name: 'email', initialValue: 'bruce@wayne.com', type: 'email' },
      });
    });
    it('should create an update value action', () => {
      expect(updateValue('email', 'bruce@wayne.com')).toEqual({
        type: 'SINGLE_INPUT_FORM.UPDATE_VALUE',
        payload: { name: 'email', value: 'bruce@wayne.com' },
      });
    });
    it('should create an confirm action', () => {
      expect(confirm('email')).toEqual({
        type: 'SINGLE_INPUT_FORM.CONFIRM',
        payload: { name: 'email' },
      });
    });
  });

  describe('sagas', () => {
    it('should redirect to singleInputPage', () => {
      const saga = startEditSaga({ payload: { name: 'email' } });
      expect(saga.next().value).toEqual(
        put(NavigationActions.navigate({ routeName: 'singleInputForm', params: { name: 'email' } }))
      );
      saga.next();
    });
  });
});
