// @flow
import { takeLatest, put, all, race, take, select } from 'redux-saga/effects';

import { reset } from './Navigation';
import { login as sendLogin, type AuthModelActionType, authUserIdSelector } from './Model/Auth';
import { fetch as fetchUser } from './Model/User';

import type { StateType } from './reducers';

export { logout } from './Model/Auth';

// ACTION CREATORS
export const login = (email: string, password: string): AuthActionType => ({
  type: 'AUTH.LOGIN_PRESS',
  payload: { email, password },
});

export type AuthActionType = {
  type: 'AUTH.LOGIN_PRESS',
  payload: {
    email: string,
    password: string,
  },
};

export type AuthStateType = {
  sendingLogin: boolean,
  loginFailure: boolean,
};

const initialState: AuthStateType = {
  sendingLogin: false,
  loginFailure: false,
};

// REDUCER
export function authReducer(
  state: AuthStateType = initialState,
  action: AuthActionType | AuthModelActionType
): AuthStateType {
  switch (action.type) {
    case 'AUTH.LOGIN_PRESS':
      return {
        sendingLogin: true,
        loginFailure: false,
      };
    case 'AUTH.LOGIN_SUCCESS':
      return {
        sendingLogin: false,
        loginFailure: false,
      };
    case 'AUTH.LOGIN_FAILURE':
      return {
        sendingLogin: false,
        loginFailure: true,
      };
    default:
      return state;
  }
}

// SELECTORS
export const sendingLoginSelector = (state: StateType): boolean => state.auth.sendingLogin;
export const loginFailureSelector = (state: StateType): boolean => state.auth.loginFailure;

// SAGAS
function* sendLoginSaga(action): Generator<*, *, *> {
  const { email, password } = action.payload;
  yield put(sendLogin(email, password));
  const result = yield race({
    success: take('AUTH.LOGIN_SUCCESS'),
    failure: take('AUTH.LOGIN_FAILURE'),
  });
  if (result.success) {
    yield put(reset('dashboard'));

    const userId = yield select(authUserIdSelector);
    yield put(fetchUser(userId));
  }
}

function* logoutSaga(action): Generator<*, *, *> {
  yield put(reset('landing'));
}

export function* authSaga(): Generator<*, *, *> {
  yield all([takeLatest('AUTH.LOGIN_PRESS', sendLoginSaga), takeLatest('AUTH.LOGOUT', logoutSaga)]);
}
