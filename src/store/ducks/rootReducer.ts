import { combineReducers } from 'redux';

import activity, { ActivityState } from './activity';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import action, { ActionState } from './action';

export interface RootState {
  auth: AuthState;
  user: UserState;
  activity: ActivityState;
  action: ActionState;
}

const reducers = combineReducers({
  auth,
  user,
  activity,
  action,
});

export default reducers;
