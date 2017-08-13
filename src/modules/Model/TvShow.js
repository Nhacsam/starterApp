// @flow
import createModelModule from 'redux-crud-model';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import * as api from 'starterApp/src/lib/api';

import { tvShowSchema } from 'modelDefinition';

import type { TvShowType, NormalizedResultType, NormalizedEntitiesType } from 'modelDefinition';
import type { StateType } from '../reducers';
import type { Module, State as ModuleStateType } from 'redux-crud-model/TypeDefinitions';

const { actionTypes, reducer, actionCreators, selectors }: Module<TvShowType> = createModelModule({
  name: 'tvShows',
});

// TYPES

export type TvShowModelActionType =
  | {
      type: 'TV_SHOW.SEARCH',
      payload: { query: string },
    }
  | {
      type: 'TV_SHOW.SEARCH_SUCCESS',
      payload: {
        result: any,
        query: string,
      },
      entities: NormalizedEntitiesType,
    }
  | {
      type: 'TV_SHOW.SEARCH_FAILURE',
      payload: {},
    };

export type TvShowModelStateType = ModuleStateType<TvShowType>;

// ACTION CREATORS
export const fetchList = actionCreators.fetchList;
export const fetchListSuccess = actionCreators.fetchListSuccess;
export const fetchListFailure = actionCreators.fetchListFailed;
export const fetch = actionCreators.fetchOne;
export const fetchSuccess = actionCreators.fetchOneSuccess;
export const fetchFailure = actionCreators.fetchOneFailed;

export const search = (query: string): TvShowModelActionType => ({
  type: 'TV_SHOW.SEARCH',
  payload: { query },
});
export const searchSuccess = (
  result: NormalizedResultType,
  query: string
): TvShowModelActionType => ({
  type: 'TV_SHOW.SEARCH_SUCCESS',
  entities: result.entities,
  payload: { result: result.result, query },
});

export const searchFailure = (): TvShowModelActionType => ({
  type: 'TV_SHOW.SEARCH_FAILURE',
  payload: {},
});

// REDUCER
export const tvShowModelReducer = reducer;

// SELECTORS

const stateSelector = (state: StateType): TvShowModelStateType => state.model.tvShow;
const composeSelector = selector => (state, ...param) => selector(stateSelector(state), ...param);

export const entitySelector: (StateType, number) => ?TvShowType = composeSelector(
  selectors.entitySelector
);
export const listSelector: (
  StateType,
  number[] | { [any]: number }
) => TvShowType[] = composeSelector(selectors.entityListSelector);
export const entitiesSelector: StateType => TvShowType[] = composeSelector(
  selectors.entitiesSelector
);

// SAGAS
const tvShowListSchema = {
  results: new schema.Values(tvShowSchema),
};

function* fetchListSaga(action): Generator<*, *, *> {
  console.log('fetchListSaga', action);
  try {
    const response = yield call(api.getTvShows);
    console.log(response);
    const normalizedResonse = normalize(response, tvShowListSchema);
    yield put(fetchListSuccess(normalizedResonse));
  } catch (e) {
    console.error(e);
    yield put(fetchListFailure(e));
  }
}

function* fetchSaga(action): Generator<*, *, *> {
  try {
    const response = yield call(api.getTvShow, action.payload.id);
    yield put(fetchSuccess(normalize(response, tvShowSchema)));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}

function* searchSaga(action): Generator<*, *, *> {
  try {
    const response = yield call(api.searchTvShow, action.payload.query);
    yield put(searchSuccess(normalize(response, tvShowListSchema), action.payload.query));
  } catch (e) {
    yield put(searchFailure());
  }
}

export function* tvShowModelSaga(): Generator<*, *, *> {
  yield all([
    takeLatest(actionTypes.fetchList, fetchListSaga),
    takeLatest(actionTypes.fetchOne, fetchSaga),
    takeLatest('TV_SHOW.SEARCH', searchSaga),
  ]);
}
