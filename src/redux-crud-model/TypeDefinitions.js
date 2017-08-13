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
  entitySelector: (State<E>, Id) => E,
  statusSelector: (State<E>, Id) => EntityStatus,
  entityListSelector: (State<E>, Id[]) => E[],
  entitiesSelector: (State<E>) => E[],
|};

export type Creators<E> = {|
  fetchOne: number => Action<E, { id: Id }>,
  fetchOneSuccess: (NormalizedResultType<E>) => Action<E, { result: any }>,
  fetchOneFailed: (Id, Object) => Action<E, { id: Id }>,
  fetchList: (?string) => Action<E, { name: ?string }>,
  fetchListSuccess: (NormalizedResultType<E>, ?string) => Action<E, { result: any }>,
  fetchListFailed: (Object, string) => Action<E, { name: string }>,
|};

export type Module<E> = {|
  actionTypes: ActionTypes,
  reducer: Reducer<E>,
  selectors: Selectors<E>,
  actionCreators: Creators<E>,
|};
