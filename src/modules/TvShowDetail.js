// @flow
import { takeLatest, put, all } from 'redux-saga/effects';

import { fetchOne, entitySelector } from './Model/TvShow';
import { NavigationActions } from 'react-navigation';

import type { TvShowModelActionType as ModelActionType } from './Model/TvShow';
import type { TvShowType } from 'modelDefinition';
import type { StateType as GlobalStateType } from './reducers';

// ACTION CREATORS
export const showDetail = (id: number): ActionType => ({
  type: 'TV_SHOW_DETAIL.SHOW',
  payload: { id },
});

export type ActionType = {
  type: 'TV_SHOW_DETAIL.SHOW',
  payload: { id: number },
};

export type StateType = {
  current: ?number,
};

const initialState: StateType = {
  current: null,
};

// REDUCER
export function reducer(
  state: StateType = initialState,
  action: ActionType | ModelActionType
): StateType {
  switch (action.type) {
    case 'TV_SHOW_DETAIL.SHOW':
      return {
        ...state,
        current: action.payload.id,
      };
    default:
      return state;
  }
}

// SELECTORS
export const tvShowSelector = (state: GlobalStateType): ?TvShowType =>
  state.tvShowDetail.current ? entitySelector(state, state.tvShowDetail.current) : null;

// SAGAS
function* showDetailSaga(action): Generator<*, *, *> {
  yield put(fetchOne(action.payload.id));
  yield put(NavigationActions.navigate({ routeName: 'tvShowDetail' }));
}

export function* saga(): Generator<*, *, *> {
  yield all([takeLatest('TV_SHOW_DETAIL.SHOW', showDetailSaga)]);
}
