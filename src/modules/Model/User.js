// @flow
import { takeLatest, call, put, all } from 'redux-saga/effects';
import _ from 'lodash';
import * as api from 'starterApp/src/lib/api';
import type { UserType } from 'modelDefinition';

import type { StateType } from '../reducers';

// ACTION CREATORS
export const create = (user: UserCreateFormType): UserModelActionType => ({
  type: 'USER.CREATE',
  payload: { user },
});
export const createSuccess = (user: UserType): UserModelActionType => ({
  type: 'USER.CREATE_SUCCESS',
  payload: { user },
});
export const createFailure = (user: UserCreateFormType): UserModelActionType => ({
  type: 'USER.CREATE_FAILURE',
  payload: { user },
});

export const fetch = (userId: number): UserModelActionType => ({
  type: 'USER.FETCH',
  payload: { userId },
});
export const fetchSuccess = (user: UserType): UserModelActionType => ({
  type: 'USER.FETCH_SUCCESS',
  payload: { user },
});
export const fetchFailure = (userId: number): UserModelActionType => ({
  type: 'USER.FETCH_FAILURE',
  payload: { userId },
});

export type UserModelActionType =
  | {
      type: 'USER.CREATE_SUCCESS' | 'USER.FETCH_SUCCESS',
      payload: {
        user: UserType,
      },
    }
  | {
      type: 'USER.CREATE' | 'USER.CREATE_FAILURE',
      payload: {
        user: UserCreateFormType,
      },
    }
  | {
      type: 'USER.FETCH' | 'USER.FETCH_FAILURE',
      payload: {
        userId: number,
      },
    };

export type UserCreateFormType = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
};

export type UserModelStateType = {
  allIds: number[],
  entities: {
    [number]: UserType,
  },
};

const initialState: UserModelStateType = {
  allIds: [],
  entities: {},
};

// REDUCER
export function userModelReducer(
  state: UserModelStateType = initialState,
  action: UserModelActionType
): UserModelStateType {
  switch (action.type) {
    case 'USER.CREATE_SUCCESS':
    case 'USER.FETCH_SUCCESS':
      const { user } = action.payload;
      if (!user.id) {
        return state;
      }

      return {
        allIds: _.uniq([...state.allIds, user.id]),
        entities: {
          ...state.entities,
          [user.id]: {
            ...state.entities[user.id],
            ...user,
          },
        },
      };
    default:
      return state;
  }
}

// SELECTORS
export const userSelector = (state: StateType, id: number) => state.model.user.entities[id];

// SAGAS
function* createSaga(action): Generator<*, *, *> {
  const { user } = action.payload;
  try {
    const updatedUser = yield call(api.signup, user);
    yield put(createSuccess(updatedUser));
  } catch (e) {
    yield put(createFailure(user));
  }
}

function* fetchSaga(action): Generator<*, *, *> {
  const { userId } = action.payload;
  try {
    const user = yield call(api.getUser, userId);
    yield put(fetchSuccess(user));
  } catch (e) {
    yield put(fetchFailure(userId));
  }
}

export function* userModelSaga(): Generator<*, *, *> {
  yield all([takeLatest('USER.CREATE', createSaga)]);
  yield all([takeLatest('USER.FETCH', fetchSaga)]);
}
