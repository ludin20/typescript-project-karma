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

export function* viewFormTrue() {
  console.log('viewFormTrue');
}

export function* viewFormFalse() {
  console.log('viewFormFalse');
}

export function* fileUploadStatus() {
  console.log('fileUploadStatus');
}

export default all([
  takeLatest(types.ACTION_REQUEST, actionRequest),
  takeLatest(types.ACTION_SUCCESS, actionSuccess),
  takeLatest(types.ACTION_FAILURE, actionFailure),
  takeLatest(types.VIEWFORM_TRUE, viewFormTrue),
  takeLatest(types.VIEWFORM_FALSE, viewFormFalse),
  takeLatest(types.FILE_UPLOAD_STATUS, fileUploadStatus),
]);
