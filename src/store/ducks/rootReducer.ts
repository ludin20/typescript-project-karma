import { combineReducers } from 'redux';

import activity, { ActivityState } from './activity';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';

export interface RootState {
  auth: AuthState;
  user: UserState;
  activity: ActivityState;
}

const reducers = combineReducers({
  auth,
  user,
  activity,
});

export default reducers;
