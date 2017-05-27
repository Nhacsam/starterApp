// @flow

import { combineReducers } from 'redux';

import { userReducer, type UserStateType, type UserActionType } from './User';
import { userModelReducer, type UserModelStateType, type UserModelActionType } from './Model/User';
import { authReducer, type AuthStateType, type AuthActionType } from './Auth';
import { authModelReducer, type AuthModelStateType, type AuthModelActionType } from './Model/Auth';
import {
  tvShowModelReducer,
  type TvShowModelStateType,
  type TvShowModelActionType,
} from './Model/TvShow';

import {
  reducer as tvShowMainListReducer,
  type StateType as TvShowMainListStateType,
  type ActionType as TvShowMainListActionType,
} from './TvShowMainList';

import {
  singleInputReducer,
  type SingleInputStateType,
  type SingleInputActionsType,
} from './SingleInputForm';

import { navigationReducer } from './Navigation';

import type { NavigationState, NavigationAction } from 'react-navigation';

export type StateType = {
  nav: NavigationState,
  user: UserStateType,
  auth: AuthStateType,
  singleInputForm: SingleInputStateType,
  tvShowMainList: TvShowMainListStateType,
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
  | SingleInputActionsType;

const appReducer = combineReducers({
  nav: navigationReducer,
  user: userReducer,
  auth: authReducer,
  singleInputForm: singleInputReducer,
  tvShowMainList: tvShowMainListReducer,
  model: combineReducers({
    auth: authModelReducer,
    user: userModelReducer,
    tvShow: tvShowModelReducer,
  }),
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
