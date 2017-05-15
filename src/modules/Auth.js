// @flow
import pick from 'lodash/pick';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { reset } from './Navigation';
import * as api from 'starterApp/src/lib/api';

import type { StateType } from './reducers';

// ACTION CREATORS
export const login = (email: string, password: string): AuthActionType => ({
  type: 'AUTH.LOGIN',
  payload: { email, password },
});
export const loginSuccess = (payload: AuthStateType): AuthActionType => ({
  type: 'AUTH.LOGIN_SUCCESS',
  payload,
});
export const loginFail = (): AuthActionType => ({ type: 'AUTH.LOGIN_FAILURE' });

export type AuthActionType =
  | {
      type: 'AUTH.LOGIN',
      payload: {
        email: string,
        password: string,
      },
    }
  | {
      type: 'AUTH.LOGIN_SUCCESS',
      payload: AuthStateType,
    }
  | {
      type: 'AUTH.LOGIN_FAILURE',
    };

export type AuthStateType = {
  accessToken: ?string,
  ttl?: number,
  created?: string,
  userId?: number,
};

const initialState: AuthStateType = {
  accessToken: null,
};

// REDUCER
export function authReducer(
  state: AuthStateType = initialState,
  action: AuthActionType
): AuthStateType {
  switch (action.type) {
    case 'AUTH.LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// SELECTORS
export const accessTokenSelector = (state: StateType): ?string => state.auth.accessToken;

// SAGAS
function* sendLoginSaga(action): Generator<*, *, *> {
  const { email, password } = action.payload;
  try {
    const result = yield call(api.login, email, password);
    yield put(
      loginSuccess({
        accessToken: result.id,
        ...pick(result, ['ttl', 'created', 'userId']),
      })
    );
    yield put(reset('dashboard'));
  } catch (e) {
    yield put(loginFail());
  }
}

export function* authSaga(): Generator<*, *, *> {
  yield all([takeLatest('AUTH.LOGIN', sendLoginSaga)]);
}
