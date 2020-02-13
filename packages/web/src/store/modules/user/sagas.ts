import { takeLatest, all, put } from 'redux-saga/effects';

import {
  createProfileRequest,
  createProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  profileFailure,
  types,
} from './actions';

export function* createProfile({ payload }: ReturnType<typeof createProfileRequest>) {
  try {
    const { data } = payload;

    if (!data) throw new Error();

    yield put(createProfileSuccess(data));
  } catch (error) {
    yield put(profileFailure());
  }
}

export function* updateProfile({ payload }: ReturnType<typeof updateProfileRequest>) {
  try {
    const { data } = payload;

    if (!data) throw new Error();

    yield put(updateProfileSuccess(data));
  } catch (error) {
    yield put(profileFailure());
  }
}

export default all([
  takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile),
  takeLatest(types.CREATE_PROFILE_REQUEST, createProfile),
]);
