// @flow
import { all, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { FOREGROUND } from 'redux-enhancer-react-native-appstate';

import {
  accessTokenSelector,
  accessTokenExpirationDateSelector,
  logout,
  authUserIdSelector,
} from './Model/Auth';
import { fetch as fetchUser } from './Model/User';
import { fetchList as fetchTvShows } from './Model/TvShow';

import { reset } from './Navigation';

function* handleUnloggedUser() {
  const accessToken = yield select(accessTokenSelector);
  if (!accessToken) {
    return false;
  }
  const currentDate = new Date().getTime();
  const expirationDate = yield select(accessTokenExpirationDateSelector);
  if (expirationDate < currentDate) {
    // If you have a strategy to refresh the token
    // Try to not logout the offline users assuming it failed
    yield put(logout());
    return false;
  }

  return true;
}

function* initializeAppSaga() {
  yield take('persist/REHYDRATE'); // wait for store rehydrate
  const isLogged = yield* handleUnloggedUser();
  if (!isLogged) {
    return;
  }

  yield put(reset('dashboard'));
}

function* resumeSaga() {
  const isLogged = yield* handleUnloggedUser();
  if (!isLogged) {
    return;
  }

  // refresh datas
  const userId = yield select(authUserIdSelector);
  yield put(fetchUser(userId));
  yield put(fetchTvShows());
}

export function* saga(): Generator<*, *, *> {
  yield all([fork(initializeAppSaga), takeLatest(FOREGROUND, resumeSaga)]);
}
