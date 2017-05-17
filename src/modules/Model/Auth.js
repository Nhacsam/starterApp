// @flow
import pick from 'lodash/pick';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from 'starterApp/src/lib/api';

import type { StateType } from '../reducers';

// ACTION CREATORS
export const login = (email: string, password: string): AuthModelActionType => ({
  type: 'AUTH.LOGIN',
  payload: { email, password },
});
export const loginSuccess = (payload: AuthModelStateType): AuthModelActionType => ({
  type: 'AUTH.LOGIN_SUCCESS',
  payload,
});
export const loginFail = (): AuthModelActionType => ({ type: 'AUTH.LOGIN_FAILURE' });
export const logout = (): AuthModelActionType => ({ type: 'AUTH.LOGOUT' });

export type AuthModelActionType =
  | {
      type: 'AUTH.LOGIN',
      payload: {
        email: string,
        password: string,
      },
    }
  | {
      type: 'AUTH.LOGIN_SUCCESS',
      payload: AuthModelStateType,
    }
  | {
      type: 'AUTH.LOGIN_FAILURE' | 'AUTH.LOGOUT',
    };

export type AuthModelStateType = {
  accessToken: ?string,
  ttl?: number,
  created?: string,
  userId?: number,
};

const initialState: AuthModelStateType = {
  accessToken: null,
};

// REDUCER
export function authModelReducer(
  state: AuthModelStateType = initialState,
  action: AuthModelActionType
): AuthModelStateType {
  switch (action.type) {
    case 'AUTH.LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'AUTH.LOGOUT':
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const accessTokenSelector = (state: StateType): ?string => state.model.auth.accessToken;

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
  } catch (e) {
    yield put(loginFail());
  }
}

export function* authModelSaga(): Generator<*, *, *> {
  yield all([takeLatest('AUTH.LOGIN', sendLoginSaga)]);
}
