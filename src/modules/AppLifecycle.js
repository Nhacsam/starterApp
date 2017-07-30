// @flow
import { all, fork, put, select, take } from 'redux-saga/effects';

import { accessTokenSelector, accessTokenExpirationDateSelector, logout } from './Model/Auth';
import { reset } from './Navigation';

function* initializeAppSaga() {
  yield take('persist/REHYDRATE'); // wait for store rehydrate

  const accessToken = yield select(accessTokenSelector);
  if (!accessToken) {
    return;
  }
  const currentDate = new Date().getTime();
  const expirationDate = yield select(accessTokenExpirationDateSelector);
  if (expirationDate < currentDate) {
    // If you have a strategy to refresh the token
    // Try to not logout the offline users assuming it failed
    yield put(logout());
    return;
  }

  yield put(reset('dashboard'));
}

export function* saga(): Generator<*, *, *> {
  yield all([fork(initializeAppSaga)]);
}
