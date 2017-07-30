// @flow
import { put, race, take } from 'redux-saga/effects';
import type { StateType as GlobalStateType } from './reducers';

const actions = {
  startLoading: 'API_CALL_STATE.START_LOADING',
  stopLoading: 'API_CALL_STATE.STOP_LOADING',
  setError: 'API_CALL_STATE.SET_ERROR',
};

export type StateType = {
  loading: {
    [key: string]: boolean,
  },
  errors: {
    [key: string]: any,
  },
};

export type ActionType = {
  type: string,
  payload: {
    name: string,
    error?: string,
  },
};

// ACTION CREATORS
export const startLoading = (name: string): ActionType => ({
  type: actions.startLoading,
  payload: { name },
});

export const stopLoading = (name: string): ActionType => ({
  type: actions.stopLoading,
  payload: { name },
});

export const setError = (name: string, error?: any): ActionType => ({
  type: actions.setError,
  payload: { name, error },
});

export const clearError = (name: string): ActionType => setError(name, null);

// REDUCER

const initialState = {
  loading: {},
  errors: {},
};

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case actions.startLoading:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.name]: true,
        },
        errors: {
          ...state.loading,
          [action.payload.name]: null,
        },
      };
    case actions.stopLoading:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.name]: false,
        },
      };
    case actions.setError:
      return {
        ...state,
        errors: {
          ...state.loading,
          [action.payload.name]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

// SELECTORS
export function isLoadingSelector(state: GlobalStateType, name: string): boolean {
  return !!state.apiCallState.loading[name];
}
export function haveFailedSelector(state: GlobalStateType, name: string): boolean {
  return !!state.apiCallState.errors[name];
}
export function errorSelector(state: GlobalStateType, name: string): any {
  return state.apiCallState.errors[name];
}

// SAGAS
type putModelActionParam = {
  action: Object,
  successAction: string,
  failureAction: string,
  name?: string,
};

export function* putModelAction(params: putModelActionParam): Generator<*, *, *> {
  const { action, successAction, failureAction, name } = params;

  if (name) {
    yield put(startLoading(name));
  }

  yield put(action);
  const result = yield race({
    success: take(successAction),
    failure: take(failureAction),
  });
  if (name) {
    yield put(stopLoading(name));

    if (result.failure) {
      const error = result.failure.error ? result.failure.error : true;
      yield put(setError(name, error));
    }
  }
  return !!result.success;
}
