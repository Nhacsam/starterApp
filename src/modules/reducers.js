// @flow

import { combineReducers } from 'redux';

import { userReducer, type UserStateType, type UserActionType } from './User';
import { userModelReducer, type UserModelStateType, type UserModelActionType } from './Model/User';
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
    user: UserModelStateType,
  },
};
export type ActionType =
  | UserActionType
  | NavigationAction
  | AuthActionType
  | AuthModelActionType
  | UserModelStateType
  | UserModelActionType;

console.log(userModelReducer);
const appReducer = combineReducers({
  nav: navigationReducer,
  user: userReducer,
  auth: authReducer,
  model: combineReducers({
    auth: authModelReducer,
    user: userModelReducer,
  }),
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
