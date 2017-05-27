// @flow
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import * as api from 'starterApp/src/lib/api';

import { tvShowSchema } from 'modelDefinition';

import type { TvShowType, NormalizedResultType, NormalizedEntitiesType } from 'modelDefinition';
import type { StateType } from '../reducers';

// TYPES

export type TvShowModelActionType =
  | {
      type: 'TV_SHOW.FETCH_LIST',
      payload: {},
    }
  | {
      type: 'TV_SHOW.FETCH_LIST_SUCCESS',
      payload: {
        result: any,
      },
      entities: NormalizedEntitiesType,
    }
  | {
      type: 'TV_SHOW.FETCH_LIST_FAILURE',
      payload: {},
    };

export type EntityStatusType = 'fetching' | 'fetched' | 'error' | 'refreshing' | 'saving';
export type TvShowModelStateType = {
  entities: {
    [number]: TvShowType,
  },
  status: {
    [number]: EntityStatusType,
  },
};

// ACTION CREATORS
export const fetchList = (): TvShowModelActionType => ({
  type: 'TV_SHOW.FETCH_LIST',
  payload: {},
});
export const fetchListSuccess = (result: NormalizedResultType): TvShowModelActionType => ({
  type: 'TV_SHOW.FETCH_LIST_SUCCESS',
  entities: result.entities,
  payload: { result: result.result },
});
export const fetchListFailure = (): TvShowModelActionType => ({
  type: 'TV_SHOW.FETCH_LIST_FAILURE',
  payload: {},
});

// REDUCER
const initialState = {
  entities: {},
  status: {},
};

export function tvShowModelReducer(
  state: TvShowModelStateType = initialState,
  action: TvShowModelActionType
): TvShowModelStateType {
  switch (action.type) {
    default:
      if (!action.entities || !action.entities.tvShows) {
        return state;
      }
      // $FlowFixMe
      return newEntitiesReducer(state, action.entities.tvShows);
  }
}

const newEntitiesReducer = (
  state: TvShowModelStateType,
  tvShows: { [number]: TvShowType }
): TvShowModelStateType => {
  const ids = Object.keys(tvShows);
  const newState = {
    entities: {
      ...state.entities,
    },
    status: {
      ...state.status,
    },
  };

  ids.forEach(idKey => {
    const id = Number(idKey);
    newState.entities[id] = {
      ...state.entities[id],
      ...tvShows[id],
    };
    newState.status[id] = 'fetched';
  });
  return newState;
};

// SELECTORS
export const entitySelector = (state: StateType, id: number): ?TvShowType =>
  state.model.tvShow.entities[id];
export const listSelector = (state: StateType, ids: number[] | { [any]: number }): TvShowType[] => {
  const entities = _.map(ids, id => entitySelector(state, id));
  return _.filter(entities, (entity: ?TvShowType): boolean => !!entity);
};

// SAGAS
const tvShowListSchema = {
  results: new schema.Values(tvShowSchema),
};

function* fetchListSaga(action): Generator<*, *, *> {
  try {
    const response = yield call(api.getTvShows);
    yield put(fetchListSuccess(normalize(response, tvShowListSchema)));
  } catch (e) {
    yield put(fetchListFailure());
  }
}

export function* tvShowModelSaga(): Generator<*, *, *> {
  yield all([takeLatest('TV_SHOW.FETCH_LIST', fetchListSaga)]);
}
