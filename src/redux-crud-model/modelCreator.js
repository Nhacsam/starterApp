// @flow
import R from 'ramda';

import createReducer from './createReducer';
import type {
  Module,
  State,
  ModuleParams,
  ActionTypes,
  Reducer,
  Selectors,
  Creators,
} from './TypeDefinitions.js';

function createActionTypes(name: string): ActionTypes {
  const upperName = name.toUpperCase();

  return {
    fetchOne: `MODEL_${upperName}.FETCH_ONE`,
    fetchOneSuccess: `MODEL_${upperName}.FETCH_ONE_SUCCESS`,
    fetchOneFailed: `MODEL_${upperName}.FETCH_ONE_FAILED`,
    fetchList: `MODEL_${upperName}.FETCH_LIST`,
    fetchListSuccess: `MODEL_${upperName}.FETCH_LIST_SUCCESS`,
    fetchListFailed: `MODEL_${upperName}.FETCH_LIST_FAILED`,
  };
}

function createModuleReducer<E>(moduleParams: ModuleParams<E>): Reducer<E> {
  const { name, reducers } = moduleParams;
  const actionTypes = createActionTypes(name);

  const initialState: State<E> = {
    entities: {},
    status: {},
  };

  const fetchOneReducer: Reducer<E> = (state, action) =>
    R.assocPath(['status', action.payload.id], 'fetching', state);

  const fetchOneFailedReducer: Reducer<E> = (state, action) =>
    R.assocPath(['status', action.payload.id], 'error', state);

  const defaultReducer: Reducer<E> = (state = initialState, action) => {
    const entities = R.path(['entities', name], action);
    if (!entities) {
      return state;
    }
    return R.mergeDeepRight(state, {
      entities,
      status: R.map(() => 'fetched', entities),
    });
  };

  return createReducer(
    initialState,
    {
      [actionTypes.fetchOne]: fetchOneReducer,
      [actionTypes.fetchOneFailed]: fetchOneFailedReducer,
      ...reducers,
    },
    defaultReducer
  );
}

function createModulSelectors<E>(moduleParams: ModuleParams<E>): Selectors<E> {
  const entitySelector = (state, id) => state.entities[id];
  // prettier-ignore
  const entityListSelector = (state, ids) => R.compose(
    R.filter((entity: ?E): boolean => !!entity),
    R.map(id => entitySelector(state, id))
  )(ids);

  return {
    entitySelector,
    entityListSelector,
    entitiesSelector: state => R.values(state.entities),
    statusSelector: (state, id) => state.status[id] || 'unknown',
  };
}

function createModueActionCreators<E>(moduleParams: ModuleParams<E>): Creators<E> {
  const { name } = moduleParams;
  const actionTypes = createActionTypes(name);

  return {
    fetchOne: id => ({
      type: actionTypes.fetchOne,
      payload: { id },
    }),
    fetchOneSuccess: normalizedResult => ({
      type: actionTypes.fetchOneSuccess,
      payload: {
        result: normalizedResult.result,
      },
      entities: normalizedResult.entities,
    }),
    fetchOneFailed: (id, error) => ({
      type: actionTypes.fetchOneFailed,
      payload: { id },
      error,
    }),
    fetchList: name => ({
      type: actionTypes.fetchList,
      payload: { name },
    }),
    fetchListSuccess: (normalizedResult, name) => ({
      type: actionTypes.fetchListSuccess,
      payload: {
        name,
        result: normalizedResult.result,
      },
      entities: normalizedResult.entities,
    }),
    fetchListFailed: (error, name) => ({
      type: actionTypes.fetchListFailed,
      payload: { name },
      error,
    }),
  };
}

export default function createModelModule<E>(moduleParams: ModuleParams<E>): Module<E> {
  const { name } = moduleParams;

  const actionTypes = createActionTypes(name);
  const reducer = createModuleReducer(moduleParams);
  const selectors = createModulSelectors(moduleParams);
  const actionCreators = createModueActionCreators(moduleParams);

  return {
    actionTypes,
    reducer,
    selectors,
    actionCreators,
  };
}
