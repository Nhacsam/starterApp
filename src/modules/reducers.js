// @flow

import { combineReducers } from 'redux';

import { userReducer, type UserStateType, type UserActionType } from './User';
import { authReducer, type AuthStateType, type AuthActionType } from './Auth';

import { navigationReducer } from './Navigation';

import type { NavigationState, NavigationAction } from 'react-navigation';

export type StateType = {
  nav: NavigationState,
  user: UserStateType,
  auth: AuthStateType,
};
export type ActionType = UserActionType | NavigationAction | AuthActionType;

const appReducer = combineReducers({
  nav: navigationReducer,
  user: userReducer,
  auth: authReducer,
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
