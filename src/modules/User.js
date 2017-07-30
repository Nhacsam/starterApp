// @flow
import { takeLatest, put, all, race, take, select } from 'redux-saga/effects';
import type { UserType } from 'modelDefinition';
import Toast from 'react-native-root-toast';

import { create, userSelector, update } from './Model/User';
import type { UserModelActionType } from './Model/User';

import I18n from 'lib/i18n';

import { putModelAction, isLoadingSelector, haveFailedSelector } from './ApiCallState';
import { authUserIdSelector } from './Model/Auth';
import { login } from './Auth';
import { valueSelector } from './SingleInputForm';
import type { StateType } from './reducers';

const formNameAttributeMapping = {
  userEmail: 'email',
  userPassword: 'password',
  userFirstName: 'firstName',
  userLastName: 'lastName',
};

// ACTION CREATORS
export const register = (user: UserType): UserActionType => ({
  type: 'USER.REGISTER',
  payload: { user },
});

// TYPES
export type UserActionType = {
  type: 'USER.REGISTER',
  payload: {
    user: UserType,
  },
};

// SELECTORS
export const registeringSelector = (state: StateType): boolean =>
  isLoadingSelector(state, 'register');
export const registeringFailureSelector = (state: StateType): boolean =>
  haveFailedSelector(state, 'register');
export const currentUserSelector = (state: StateType): ?UserType => {
  const userId = authUserIdSelector(state);
  if (!userId) {
    return null;
  }
  return userSelector(state, userId);
};

// SAGAS
function* sendRegisterSaga(action): Generator<*, *, *> {
  const { user } = action.payload;
  const success = yield* putModelAction({
    action: create(user),
    successAction: 'USER.CREATE_SUCCESS',
    failureAction: 'USER.CREATE_FAILURE',
    name: 'register',
  });

  if (!success) {
    return;
  }
  yield* putModelAction({
    action: login(user.email, user.password),
    successAction: 'AUTH.LOGIN_SUCCESS',
    failureAction: 'AUTH.LOGIN_FAILURE',
    name: 'register',
  });
}

function* updateUserSaga(action): Generator<*, *, *> {
  const { name } = action.payload;
  const attr = formNameAttributeMapping[name];
  if (!attr) {
    return;
  }
  const prevUser = yield select(currentUserSelector);
  const value = yield select(valueSelector, name);
  const user = {
    ...prevUser,
    [attr]: value,
  };
  const success = yield* putModelAction({
    action: update(user, true),
    successAction: 'USER.UPDATE_SUCCESS',
    failureAction: 'USER.UPDATE_FAILURE',
  });

  if (!success) {
    Toast.show(I18n.t('user.update_failure'));
  }
}

export function* userSaga(): Generator<*, *, *> {
  yield all([
    takeLatest('USER.REGISTER', sendRegisterSaga),
    takeLatest('SINGLE_INPUT_FORM.CONFIRM', updateUserSaga),
  ]);
}
