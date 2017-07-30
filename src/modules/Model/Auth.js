// @flow
import { takeLatest, call, put, all } from 'redux-saga/effects';

import * as api from 'starterApp/src/lib/api';

import type { AuthType } from 'modelDefinition';
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
      payload: AuthType,
    }
  | {
      type: 'AUTH.LOGIN_FAILURE' | 'AUTH.LOGOUT',
    };

export type AuthModelStateType = $Shape<AuthType>;

const initialState: AuthModelStateType = {};

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
export const accessTokenSelector = (state: StateType): ?string => state.model.auth.id;
export const authUserIdSelector = (state: StateType): ?number => state.model.auth.userId;
export const accessTokenTtlSelector = (state: StateType): ?number => state.model.auth.ttl;
export const accessTokenCreationDateSelector = (state: StateType): ?Date => {
  const created = state.model.auth.created;
  if (!created) {
    return null;
  }
  return new Date(created);
};

export const accessTokenExpirationDateSelector = (state: StateType): number => {
  const accessTokenCreationDate = accessTokenCreationDateSelector(state);
  const ttl = accessTokenTtlSelector(state);
  if (!accessTokenCreationDate || !ttl) {
    return 0;
  }
  return accessTokenCreationDate.getTime() + ttl * 1000;
};

// SAGAS
function* sendLoginSaga(action): Generator<*, *, *> {
  const { email, password } = action.payload;
  try {
    const result = yield call(api.login, email, password);
    yield put(loginSuccess(result));
  } catch (e) {
    yield put(loginFail());
  }
}

export function* authModelSaga(): Generator<*, *, *> {
  yield all([takeLatest('AUTH.LOGIN', sendLoginSaga)]);
}
