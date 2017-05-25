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

export const update = (
  user: UserCreateFormType,
  notOptimistic: ?boolean = false
): UserModelActionType => ({
  type: 'USER.UPDATE',
  payload: { user, notOptimistic },
});
export const updateSuccess = (user: UserType): UserModelActionType => ({
  type: 'USER.UPDATE_SUCCESS',
  payload: { user },
});
export const updateFailure = (user: UserCreateFormType): UserModelActionType => ({
  type: 'USER.UPDATE_FAILURE',
  payload: { user },
});

export type UserModelActionType =
  | {
      type:
        | 'USER.CREATE_SUCCESS'
        | 'USER.FETCH_SUCCESS'
        | 'USER.UPDATE'
        | 'USER.UPDATE_SUCCESS'
        | 'USER.UPDATE_FAILURE',
      payload: {
        user: UserType,
      },
    }
  | {
      type: 'USER.UPDATE',
      payload: {
        user: UserType,
        notOptimistic: boolean,
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
  fallbacks: {
    [number]: UserType,
  },
};

const initialState: UserModelStateType = {
  allIds: [],
  entities: {},
  fallbacks: {},
};

function updateEntities(state: { [number]: UserType }, user: UserType) {
  return {
    ...state,
    [user.id]: {
      ...state[user.id],
      ...user,
    },
  };
}

// REDUCER
export function userModelReducer(
  state: UserModelStateType = initialState,
  action: UserModelActionType
): UserModelStateType {
  let user: UserType;

  switch (action.type) {
    case 'USER.CREATE_SUCCESS':
    case 'USER.FETCH_SUCCESS':
    case 'USER.UPDATE_SUCCESS':
      user = action.payload.user;
      return {
        ...state,
        allIds: _.uniq([...state.allIds, user.id]),
        entities: updateEntities(state.entities, user),
      };
    case 'USER.UPDATE':
      user = action.payload.user;
      if (action.payload.notOptimistic) {
        return state;
      }

      return {
        ...state,
        allIds: _.uniq([...state.allIds, user.id]),
        entities: updateEntities(state.entities, user),
        fallbacks: {
          ...state.fallbacks,
          [user.id]: state.entities[user.id],
        },
      };
    case 'USER.UPDATE_FAILURE':
      user = action.payload.user;
      return {
        ...state,
        entities: {
          ...state.entities,
          [user.id]: state.fallbacks[user.id],
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

function* updateSaga(action): Generator<*, *, *> {
  const { user } = action.payload;
  try {
    const updatedUser = yield call(api.updateUser, user);
    yield put(updateSuccess(updatedUser));
  } catch (e) {
    yield put(updateFailure(user));
  }
}

export function* userModelSaga(): Generator<*, *, *> {
  yield all([
    takeLatest('USER.CREATE', createSaga),
    takeLatest('USER.UPDATE', updateSaga),
    takeLatest('USER.FETCH', fetchSaga),
  ]);
}
