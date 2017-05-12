// @flow
import { fork, all } from 'redux-saga/effects';
import { userSaga } from './User';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([fork(userSaga)]);
}
