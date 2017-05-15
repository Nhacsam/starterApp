// @flow
import { fork, all } from 'redux-saga/effects';
import { userSaga } from './User';
import { authSaga } from './Auth';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([fork(userSaga), fork(authSaga)]);
}
