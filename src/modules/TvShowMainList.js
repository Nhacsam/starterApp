// @flow
import { takeLatest, put, all } from 'redux-saga/effects';

import { fetchList, listSelector } from './Model/TvShow';
import { takeEveryPathEnter } from './Navigation';

import type { TvShowModelActionType as ModelActionType } from './Model/TvShow';
import type { TvShowType } from 'modelDefinition';
import type { StateType as GlobalStateType } from './reducers';

// ACTION CREATORS
export const refresh = (): ActionType => ({
  type: 'TV_SHOW_MAIN_LIST.REFRESH_LIST',
  payload: {},
});

export type ActionType = {
  type: 'TV_SHOW_MAIN_LIST.REFRESH_LIST',
  payload: {},
};

export type StateType = {
  fetching: boolean,
  refreshing: boolean,
  error: boolean,
  results: { [number]: number } | number[],
  page: ?number,
  totalResults: ?number,
  totalPages: ?number,
};

const initialState: StateType = {
  fetching: false,
  refreshing: false,
  error: false,
  results: [],
  page: null,
  totalResults: null,
  totalPages: null,
};

// REDUCER
export function reducer(
  state: StateType = initialState,
  action: ActionType | ModelActionType
): StateType {
  switch (action.type) {
    case 'TV_SHOW_MAIN_LIST.REFRESH_LIST':
      return {
        ...state,
        refreshing: true,
      };
    case 'TV_SHOW.FETCH_LIST':
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case 'TV_SHOW.FETCH_LIST_SUCCESS':
      return {
        ...state,
        fetching: false,
        refreshing: false,
        results: action.payload.result.results,
        page: action.payload.result.page,
        totalResults: action.payload.result.total_results,
        totalPages: action.payload.result.total_pages,
      };
    case 'TV_SHOW.FETCH_LIST_FAILURE':
      return {
        ...state,
        fetching: false,
        refreshing: false,
        error: true,
      };
    default:
      return state;
  }
}

// SELECTORS
export const fetchingSelector = (state: GlobalStateType): boolean => state.tvShowMainList.fetching;
export const refreshingSelector = (state: GlobalStateType): boolean =>
  state.tvShowMainList.refreshing;
export const errorSelector = (state: GlobalStateType): boolean => state.tvShowMainList.error;
export const tvShowsSelector = (state: GlobalStateType): TvShowType[] =>
  listSelector(state, state.tvShowMainList.results);

// SAGAS
function* fetchSaga(action): Generator<*, *, *> {
  yield put(fetchList());
}

export function* saga(): Generator<*, *, *> {
  yield all([
    takeLatest('TV_SHOW_MAIN_LIST.REFRESH_LIST', fetchSaga),
    takeEveryPathEnter('dashboard/dashboardTabs/home', fetchSaga),
  ]);
}
