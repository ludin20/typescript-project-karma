import { takeLatest, all, put } from 'redux-saga/effects';

import { readNotificationsSuccess, readNotificationsFailure, types } from '../ducks/activity';

export function* readNotifications() {
  try {
    yield put(readNotificationsSuccess());
  } catch (error) {
    yield put(readNotificationsFailure());
  }
}

export default all([takeLatest(types.READ_NOTIFICATIONS_REQUEST, readNotifications)]);
