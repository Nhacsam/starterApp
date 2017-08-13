// @flow
import createModelModule from 'redux-crud-model';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import * as api from 'starterApp/src/lib/api';

import { tvShowSchema } from 'modelDefinition';

import type { TvShowType } from 'modelDefinition';
import type { StateType } from '../reducers';
import type { Module, State } from 'redux-crud-model/TypeDefinitions';

const { actionTypes, reducer, actionCreators, selectors }: Module<TvShowType> = createModelModule({
  name: 'tvShows',
  storeSelector: (state: StateType): State<TvShowType> => state.model.tvShow,
});

export { actionTypes };
export const {
  fetchList,
  fetchListSuccess,
  fetchListFailed,
  fetchOne,
  fetchOneSuccess,
  fetchOneFailed,
} = actionCreators;

export const { entitySelector, entityListSelector, entitiesSelector } = selectors;

export default reducer;

// ACTION CREATORS
export const search = (query: string) => actionCreators.fetchList('search', { query });
export const searchSuccess = (results: *, query: string) =>
  actionCreators.fetchListSuccess(results, 'search', { query });
export const searchFailure = (e: *) => actionCreators.fetchListFailed(e, 'search');

// SAGAS
const tvShowListSchema = {
  results: new schema.Values(tvShowSchema),
};

function* fetchListSaga(action): Generator<*, *, *> {
  if (action.payload.query) {
    return yield* searchSaga(action);
  }

  try {
    const response = yield call(api.getTvShows);
    yield put(fetchListSuccess(normalize(response, tvShowListSchema)));
  } catch (e) {
    yield put(fetchListFailed(e));
  }
}

function* fetchSaga(action): Generator<*, *, *> {
  try {
    const response = yield call(api.getTvShow, action.payload.id);
    yield put(fetchOneSuccess(normalize(response, tvShowSchema)));
  } catch (e) {
    yield put(fetchOneFailed(action.payload.id, e));
  }
}

function* searchSaga(action): Generator<*, *, *> {
  try {
    const response = yield call(api.searchTvShow, action.payload.query);
    yield put(searchSuccess(normalize(response, tvShowListSchema), action.payload.query));
  } catch (e) {
    yield put(searchFailure(e));
  }
}

export function* saga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.fetchList, fetchListSaga),
    takeLatest(actionTypes.fetchOne, fetchSaga),
  ]);
}
