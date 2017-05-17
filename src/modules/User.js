// @flow
import { takeLatest, put, all, race, take } from 'redux-saga/effects';

import { create, type UserType, type UserModelActionType } from './Model/User';

import { reset } from './Navigation';

import type { StateType } from './reducers';

// ACTION CREATORS
export const register = (user: UserType): UserActionType => ({
  type: 'USER.REGISTER',
  payload: { user },
});

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

// SAGAS
function* sendRegisterSaga(action): Generator<*, *, *> {
  const { user } = action.payload;
  yield put(create(user));
  const result = yield race({
    success: take('USER.CREATE_SUCCESS'),
    failure: take('USER.CREATE_FAILURE'),
  });
  if (result.success) {
    yield put(reset('dashboard'));
  }
}

export function* userSaga(): Generator<*, *, *> {
  yield all([takeLatest('USER.REGISTER', sendRegisterSaga)]);
}
