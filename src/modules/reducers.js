// @flow

import { combineReducers } from 'redux';

import { userReducer } from './User';
import type { UserStateType, UserActionType } from './User';

import { navigationReducer } from './Navigation';

import type { NavigationState, NavigationAction } from 'react-navigation';

export type StateType = {
  nav: NavigationState,
  user: UserStateType,
};
export type ActionType = UserActionType | NavigationAction;

const appReducer = combineReducers({
  nav: navigationReducer,
  user: userReducer,
});

const rootReducer = (state: StateType, action: ActionType): StateType => appReducer(state, action);

export default rootReducer;
