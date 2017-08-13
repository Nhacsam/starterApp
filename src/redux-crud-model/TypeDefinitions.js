// @flow
export type Id = string | number;
export type EntityStatus = 'fetching' | 'fetched' | 'error' | 'saving' | 'unknown';

export type NormalizedEntitiesType<E> = {
  [Id]: E,
};

export type NormalizedResultType<E> = {
  result: any,
  entities: {
    [string]: NormalizedEntitiesType<E>,
  },
};

export type Action<E, Payload> = {|
  type: string,
  payload: Payload,
  entities?: {
    [string]: NormalizedEntitiesType<E>,
  },
  error?: Object,
|};

export type State<E> = {
  entities: NormalizedEntitiesType<E>,
  status: {
    [Id]: EntityStatus,
  },
};

export type Reducer<E> = (state: State<E>, action: Action<E, *>) => State<E>;

export type ModuleParams<E> = {
  name: string,
  reducers?: {
    [actionType: string]: Reducer<E>,
  },
  storeSelector: Object => State<E>,
};

export type ActionTypes = {|
  fetchOne: string,
  fetchOneSuccess: string,
  fetchOneFailed: string,
  fetchList: string,
  fetchListSuccess: string,
  fetchListFailed: string,
|};

export type Selectors<E> = {|
  entitySelector: (Object, Id) => E,
  statusSelector: (Object, Id) => EntityStatus,
  entityListSelector: (Object, Id[] | { [any]: Id }) => E[],
  entitiesSelector: Object => E[],
|};

export type LocalSelectors<E> = {|
  entitySelector: (State<E>, Id) => E,
  statusSelector: (State<E>, Id) => EntityStatus,
  entityListSelector: (State<E>, Id[] | { [any]: Id }) => E[],
  entitiesSelector: (State<E>) => E[],
|};

export type Creators<E> = {|
  fetchOne: (number, ?Object) => Action<E, { id: Id }>,
  fetchOneSuccess: (NormalizedResultType<E>, ?Object) => Action<E, { result: any }>,
  fetchOneFailed: (Id, Object, ?Object) => Action<E, { id: Id }>,
  fetchList: (?string, ?Object) => Action<E, { name: ?string }>,
  fetchListSuccess: (
    NormalizedResultType<E>,
    ?string,
    ?Object
  ) => Action<E, { result: any, name: ?string }>,
  fetchListFailed: (Object, ?string, ?Object) => Action<E, { name: ?string }>,
|};

export type Module<E> = {|
  actionTypes: ActionTypes,
  reducer: Reducer<E>,
  selectors: Selectors<E>,
  localSelectors: LocalSelectors<E>,
  actionCreators: Creators<E>,
|};
