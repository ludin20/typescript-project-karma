import { all } from 'redux-saga/effects';

import auth from './auth';
import user from './user';
import activity from './activity';

export default function* rootSaga() {
  return yield all([auth, user, activity]);
}
