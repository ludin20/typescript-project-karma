import Router from 'next/router';
import { takeLatest, all, put } from 'redux-saga/effects';

import {
  createProfileRequest,
  createProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  profileFailure,
  types,
} from '../ducks/user';

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

    const username = data.username.split('@')[1];

    const href = '/profile/[username]/[tab]';
    const as = `/profile/${username}/media`;

    Router.push(href, as, { shallow: true });
  } catch (error) {
    yield put(profileFailure());
  }
}

export default all([
  takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile),
  takeLatest(types.CREATE_PROFILE_REQUEST, createProfile),
]);
