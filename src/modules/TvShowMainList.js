// @flow
import { takeLatest, put, all, throttle } from 'redux-saga/effects';

import { fetchList, listSelector, entitiesSelector, search as searchRequest } from './Model/TvShow';

import type { TvShowModelActionType as ModelActionType } from './Model/TvShow';
import type { TvShowType } from 'modelDefinition';
import type { StateType as GlobalStateType } from './reducers';

// ACTION CREATORS
export const refresh = (): ActionType => ({
  type: 'TV_SHOW_MAIN_LIST.REFRESH_LIST',
  payload: {},
});

export const fetchTvShows = fetchList;

export const search = (query: string): ActionType => ({
  type: 'TV_SHOW_MAIN_LIST.SEARCH',
  payload: { query },
});

export type ActionType =
  | {
      type: 'TV_SHOW_MAIN_LIST.REFRESH_LIST',
      payload: {},
    }
  | {
      type: 'TV_SHOW_MAIN_LIST.SEARCH',
      payload: { query: string },
    };

export type StateType = {
  fetching: boolean,
  refreshing: boolean,
  error: boolean,
  results: { [number]: number } | number[],
  page: ?number,
  totalResults: ?number,
  totalPages: ?number,
  currentSearch: string,
  searches: {
    [string]: {
      results: number[],
      page: ?number,
      totalResults: ?number,
      totalPages: ?number,
    },
  },
};

const initialState: StateType = {
  fetching: false,
  refreshing: false,
  error: false,
  results: [],
  page: null,
  totalResults: null,
  totalPages: null,
  currentSearch: '',
  searches: {},
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
    case 'TV_SHOW.SEARCH':
      return {
        ...state,
        currentSearch: action.payload.query,
      };
    case 'TV_SHOW.SEARCH_SUCCESS':
      console.log(action);
      return {
        ...state,
        searches: {
          ...state.searches,
          [action.payload.query]: {
            results: action.payload.result.results,
            page: action.payload.result.page,
            totalResults: action.payload.result.total_results,
            totalPages: action.payload.result.total_pages,
          },
        },
      };

    case 'persist/REHYDRATE':
      return {
        ...state,
        ...action.payload.tvShowMainList,
        currentSearch: '',
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
export const tvShowsSelector = (state: GlobalStateType): TvShowType[] => {
  const currentSearch = state.tvShowMainList.currentSearch;
  if (currentSearch) {
    const searchState = state.tvShowMainList.searches[currentSearch];
    if (searchState) {
      return listSelector(state, searchState.results);
    }

    return entitiesSelector(state).filter((tvShow: TvShowType) => {
      return tvShow.name.toLowerCase().includes(currentSearch.toLowerCase());
    });
  }
  return listSelector(state, state.tvShowMainList.results);
};

// SAGAS
function* fetchSaga(action): Generator<*, *, *> {
  yield put(fetchList());
}

function* searchSaga(action): Generator<*, *, *> {
  yield put(searchRequest(action.payload.query));
}

export function* saga(): Generator<*, *, *> {
  yield all([
    takeLatest('TV_SHOW_MAIN_LIST.REFRESH_LIST', fetchSaga),
    throttle(500, 'TV_SHOW_MAIN_LIST.SEARCH', searchSaga),
  ]);
}
