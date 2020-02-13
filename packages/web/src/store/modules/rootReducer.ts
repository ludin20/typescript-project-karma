import { combineReducers } from 'redux';

import auth, { AuthState } from './auth/reducers';
import user, { UserState } from './user/reducers';
import activity, { ActivityState } from './activity/reducers';

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
