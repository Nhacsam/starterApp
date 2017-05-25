// @flow
import { NavigationActions } from 'react-navigation';
import { all, put, takeEvery } from 'redux-saga/effects';
import type { StateType } from './reducers';

// TYPES

export type SingleInputActionsType =
  | {
      type: 'SINGLE_INPUT_FORM.START_EDIT',
      payload: { name: string, initialValue: string },
    }
  | {
      type: 'SINGLE_INPUT_FORM.UPDATE_VALUE',
      payload: { name: string, value: string },
    }
  | {
      type: 'SINGLE_INPUT_FORM.CONFIRM',
      payload: { name: string },
    };

type FormState = {
  type: string,
  initialValue: string,
  value: string,
};

export type SingleInputStateType = {
  [string]: FormState,
};

// ACTION CREATORS

export const startEdit = (
  name: string,
  initialValue: string,
  type: string
): SingleInputActionsType => ({
  type: 'SINGLE_INPUT_FORM.START_EDIT',
  payload: { name, initialValue, type },
});

export const updateValue = (name: string, value: string): SingleInputActionsType => ({
  type: 'SINGLE_INPUT_FORM.UPDATE_VALUE',
  payload: { name, value },
});

export const confirm = (name: string): SingleInputActionsType => ({
  type: 'SINGLE_INPUT_FORM.CONFIRM',
  payload: { name },
});

// REDUCER

export const singleInputReducer = (
  state: SingleInputStateType = {},
  action: SingleInputActionsType
) => {
  switch (action.type) {
    case 'SINGLE_INPUT_FORM.START_EDIT':
      return {
        ...state,
        [action.payload.name]: {
          ...action.payload,
          value: action.payload.initialValue,
        },
      };
    case 'SINGLE_INPUT_FORM.UPDATE_VALUE':
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          value: action.payload.value,
        },
      };

    default:
      return state;
  }
};

// SELECTORS

export const initialValueSelector = (state: StateType, name: string): string => {
  const form = state.singleInputForm[name];
  if (!form) {
    return '';
  }
  return form.initialValue;
};

export const inputTypeSelector = (state: StateType, name: string): string => {
  const form = state.singleInputForm[name];
  if (!form) {
    return '';
  }
  return form.type;
};

export const valueSelector = (state: StateType, name: string): string => {
  const form = state.singleInputForm[name];
  if (!form) {
    return '';
  }
  return form.value;
};

// SAGAS

export function* startEditSaga(action: SingleInputActionsType): Generator<*, *, *> {
  const { name } = action.payload;
  yield put(NavigationActions.navigate({ routeName: 'singleInputForm', params: { name } }));
}

export function* confirmSaga(action: SingleInputActionsType): Generator<*, *, *> {
  yield put(NavigationActions.back());
}

export function* singleInputFormSaga(): Generator<*, *, *> {
  yield all([
    takeEvery('SINGLE_INPUT_FORM.START_EDIT', startEditSaga),
    takeEvery('SINGLE_INPUT_FORM.CONFIRM', confirmSaga),
  ]);
}
