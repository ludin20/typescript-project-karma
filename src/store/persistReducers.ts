import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'react';
import { CombinedState, AnyAction } from 'redux';

import { ActivityState } from './ducks/activity';
import { AuthState } from './ducks/auth';
import { UserState } from './ducks/user';

export default (
  reducer: Reducer<CombinedState<{ auth: AuthState; user: UserState; activity: ActivityState }>, AnyAction>,
) => {
  const persistedReducer = persistReducer(
    {
      key: 'karma',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducer,
  );

  return persistedReducer;
};
