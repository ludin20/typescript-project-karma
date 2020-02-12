import { combineReducers } from 'redux';

import auth, { AuthState } from './auth/reducers';
import user, { UserState } from './user/reducers';

export interface RootState {
  auth: AuthState;
  user: UserState;
}

const reducers = combineReducers({
  auth,
  user,
});

export default reducers;
