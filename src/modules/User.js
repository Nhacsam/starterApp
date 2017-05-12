// @flow
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { reset } from './Navigation';
import * as api from 'starterApp/src/lib/api';

import type { StateType, ActionType } from './reducers';

// ACTION CREATORS
export const register = (user: UserType): ActionType => ({ type: 'USER.REGISTER', user });
export const registerSuccess = (user: UserType): ActionType => ({
  type: 'USER.REGISTER_SUCCESS',
  user,
});
export const registerFail = (): ActionType => ({ type: 'USER.REGISTER_FAILURE' });

export type UserActionType =
  | {
      type: 'USER.REGISTER' | 'USER.REGISTER_SUCCESS',
      user: UserType,
    }
  | {
      type: 'USER.REGISTER_FAILURE',
    };

export type UserType = {
  id: number,
  email: string,
  password?: string,
  firstName?: string,
  lastName?: string,
};

export type UserStateType = {
  ...$Shape<UserType>,
  _meta: {
    registering: boolean,
    registerFailure: boolean,
  },
};

const initialState: UserStateType = {
  _meta: {
    registering: false,
    registerFailure: false,
  },
};

// REDUCER
export function userReducer(
  state: UserStateType = initialState,
  action: ActionType = {}
): UserStateType {
  switch (action.type) {
    case 'USER.REGISTER':
      return {
        ...state,
        ...action.user,
        _meta: {
          registering: true,
          registerFailure: false,
        },
      };
    case 'USER.REGISTER_SUCCESS':
      return {
        ...state,
        ...action.user,
        _meta: {
          registering: false,
          registerFailure: false,
        },
      };
    case 'USER.REGISTER_FAILURE':
      return {
        ...state,
        _meta: {
          registering: false,
          registerFailure: true,
        },
      };
    default:
      return state;
  }
}

// SELECTORS
export const registeringSelector = (state: StateType): boolean => state.user._meta.registering;
export const registeringFailureSelector = (state: StateType): boolean =>
  state.user._meta.registerFailure;

// SAGAS
function* sendRegisterSaga(action): Generator<*, *, *> {
  const user = action.user;
  try {
    const updatedUser = yield call(api.signup, user);
    yield put(registerSuccess(updatedUser));
    yield put(reset('dashboard'));
  } catch (e) {
    yield put(registerFail());
  }
}

export function* userSaga(): Generator<*, *, *> {
  yield all([takeLatest('USER.REGISTER', sendRegisterSaga)]);
}
