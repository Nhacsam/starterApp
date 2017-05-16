// @flow

import { combineReducers } from 'redux';

import { userReducer, type UserStateType, type UserActionType } from './User';
import { authReducer, type AuthStateType, type AuthActionType } from './Auth';
import { authModelReducer, type AuthModelStateType, type AuthModelActionType } from './Model/Auth';

import { navigationReducer } from './Navigation';

import type { NavigationState, NavigationAction } from 'react-navigation';

export type StateType = {
  nav: NavigationState,
  user: UserStateType,
  auth: AuthStateType,
  model: {
    auth: AuthModelStateType,
  },
};
export type ActionType = UserActionType | NavigationAction | AuthActionType | AuthModelActionType;

const appReducer = combineReducers({
  nav: navigationReducer,
  user: userReducer,
  auth: authReducer,
  model: {
    auth: authModelReducer,
  },
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
