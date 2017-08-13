// @flow

import { combineReducers } from 'redux';

import { type UserActionType } from './User';
import { userModelReducer, type UserModelStateType, type UserModelActionType } from './Model/User';
import { authReducer, type AuthStateType, type AuthActionType } from './Auth';
import { authModelReducer, type AuthModelStateType, type AuthModelActionType } from './Model/Auth';
import {
  default as tvShowModelReducer,
  type TvShowModelStateType,
  type TvShowModelActionType,
} from './Model/TvShow';

import {
  reducer as tvShowMainListReducer,
  type StateType as TvShowMainListStateType,
  type ActionType as TvShowMainListActionType,
} from './TvShowMainList';

import {
  reducer as tvShowDetailReducer,
  type StateType as TvShowDetailStateType,
  type ActionType as TvShowDetailActionType,
} from './TvShowDetail';

import {
  singleInputReducer,
  type SingleInputStateType,
  type SingleInputActionsType,
} from './SingleInputForm';

import {
  reducer as apiCallStateReducer,
  type StateType as ApiCallStateStateType,
  type ActionType as ApiCallStateActionsType,
} from './ApiCallState.js';

import { default as navigationReducer } from './Navigation/reducer.js';

import type { NavigationState, NavigationAction } from 'react-navigation';

export type StateType = {
  nav: NavigationState,
  auth: AuthStateType,
  singleInputForm: SingleInputStateType,
  tvShowMainList: TvShowMainListStateType,
  tvShowDetail: TvShowDetailStateType,
  apiCallState: ApiCallStateStateType,
  model: {
    auth: AuthModelStateType,
    user: UserModelStateType,
    tvShow: TvShowModelStateType,
  },
};
export type ActionType =
  | UserActionType
  | NavigationAction
  | AuthActionType
  | AuthModelActionType
  | UserModelStateType
  | UserModelActionType
  | TvShowModelActionType
  | TvShowMainListActionType
  | TvShowDetailActionType
  | SingleInputActionsType
  | ApiCallStateActionsType;

const appReducer = combineReducers({
  nav: navigationReducer,
  auth: authReducer,
  singleInputForm: singleInputReducer,
  tvShowMainList: tvShowMainListReducer,
  tvShowDetail: tvShowDetailReducer,
  apiCallState: apiCallStateReducer,
  model: combineReducers({
    auth: authModelReducer,
    user: userModelReducer,
    tvShow: tvShowModelReducer,
  }),
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
