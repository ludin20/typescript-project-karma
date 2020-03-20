import { Reducer } from 'react';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { CombinedState, AnyAction } from 'redux';

import { ActivityState } from './ducks/activity';
import { AuthState } from './ducks/auth';
import { UserState } from './ducks/user';

const authFilter = createFilter('auth', [
  'auth.token',
  'auth.signed',
  'auth.isNewUser',
  'auth.UserGuid',
  'auth.Author',
]);
const userFilter = createFilter('user', ['user.name', 'user.username', 'user.bio', 'user.isVerified']);

export default (
  reducer: Reducer<CombinedState<{ auth: AuthState; user: UserState; activity: ActivityState }>, AnyAction>,
) => {
  const persistedReducer = persistReducer(
    {
      key: 'karma',
      storage,
      whitelist: ['auth', 'user'],
      transforms: [authFilter, userFilter],
    },
    reducer,
  );

  return persistedReducer;
};
