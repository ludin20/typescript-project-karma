import { takeLatest, all, put } from 'redux-saga/effects';

import { types } from '../ducks/action';

export function* actionRequest() {
  console.log('actionRequest');
}

export function* actionSuccess() {
  console.log('actionSuccess');
}

export function* actionFailure() {
  console.log('actionFailure');
}

export default all([
  takeLatest(types.ACTION_REQUEST, actionRequest),
  takeLatest(types.ACTION_SUCCESS, actionSuccess),
  takeLatest(types.ACTION_FAILURE, actionFailure),
]);
