// @flow
import { takeLatest, put, all, race, take, select } from 'redux-saga/effects';
import type { UserType } from 'modelDefinition';
import Toast from 'react-native-root-toast';

import { create, userSelector, update } from './Model/User';
import type { UserModelActionType } from './Model/User';

import I18n from 'lib/i18n';

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
export type UserStateType = {
  registering: boolean,
  registerFailure: boolean,
};

export type UserActionType = {
  type: 'USER.REGISTER',
  payload: {
    user: UserType,
  },
};

const initialState: UserStateType = {
  registering: false,
  registerFailure: false,
};

// REDUCER
export function userReducer(
  state: UserStateType = initialState,
  action: UserActionType | UserModelActionType
): UserStateType {
  switch (action.type) {
    case 'USER.REGISTER':
      return {
        ...state,
        registering: true,
        registerFailure: false,
      };
    case 'USER.CREATE_SUCCESS':
      return {
        ...state,
        registering: false,
        registerFailure: false,
      };
    case 'USER.CREATE_FAILURE':
      return {
        ...state,
        registering: false,
        registerFailure: true,
      };
    default:
      return state;
  }
}

// SELECTORS
export const registeringSelector = (state: StateType): boolean => state.user.registering;
export const registeringFailureSelector = (state: StateType): boolean => state.user.registerFailure;
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
  yield put(create(user));
  const result = yield race({
    success: take('USER.CREATE_SUCCESS'),
    failure: take('USER.CREATE_FAILURE'),
  });
  if (result.failure) {
    return;
  }
  yield put(login(user.email, user.password));
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
  yield put(update(user, true));
  const result = yield race({
    success: take('USER.UPDATE_SUCCESS'),
    failure: take('USER.UPDATE_FAILURE'),
  });
  if (result.failure) {
    Toast.show(I18n.t('user.update_failure'));
  }
}

export function* userSaga(): Generator<*, *, *> {
  yield all([
    takeLatest('USER.REGISTER', sendRegisterSaga),
    takeLatest('SINGLE_INPUT_FORM.CONFIRM', updateUserSaga),
  ]);
}
