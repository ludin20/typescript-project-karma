import { takeLatest, all, put } from 'redux-saga/effects';

import { updateProfileSuccess, updateProfileFailure, types } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, ...rest } = payload.data;

    const profile = {
      name,
      ...(rest.oldPassword ? rest : {}),
    };

    yield put(updateProfileSuccess(profile));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile)]);
