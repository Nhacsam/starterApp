// @flow
import { fork, all } from 'redux-saga/effects';
import { userSaga } from './User';
import { userModelSaga } from './Model/User';
import { authSaga } from './Auth';
import { authModelSaga } from './Model/Auth';
import { singleInputFormSaga } from './SingleInputForm';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    fork(userSaga),
    fork(authSaga),
    fork(authModelSaga),
    fork(userModelSaga),
    fork(singleInputFormSaga),
  ]);
}
