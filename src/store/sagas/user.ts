import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';

import {
  createProfileRequest,
  createProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  profileFailure,
  types,
  defaultProfile,
} from '../ducks/user';
import { REQUEST_JWT, RESPONSE_JWT } from '../../common/config';
import api from '../../services/api';
import { AuthState } from '../ducks/auth';
import { RootState } from '../ducks/rootReducer';

export function* createProfile({ payload }: ReturnType<typeof createProfileRequest>) {
  const { Author: ReducerAuthor }: AuthState = yield select((state: RootState) => state.auth);

  try {
    const { bio, username, name, hash } = payload.data;

    const body = {
      author: ReducerAuthor,
      usernameOrig: payload.oldData.username,
      usernameNew: username,
      hash,
      bio,
      displayname: name,
      domain_id: 1,
    };

    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };
    const { data } = yield call(api.post, 'profile/changeprofile', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid } = decodedData.response;

    if (!IsValid) {
      yield put(profileFailure());
    }

    yield put(createProfileSuccess(defaultProfile));
  } catch (error) {
    yield put(profileFailure());
  }
}

export function* updateProfile({ payload }: ReturnType<typeof updateProfileRequest>) {
  const { Author: ReducerAuthor }: AuthState = yield select((state: RootState) => state.auth);

  try {
    const { bio, username, name, hash } = payload.data;

    const body = {
      author: ReducerAuthor,
      usernameOrig: payload.oldData.username,
      usernameNew: username,
      hash,
      bio,
      displayname: name,
      domain_id: 1,
    };

    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };
    const { data } = yield call(api.post, 'profile/changeprofile', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid } = decodedData.response;

    if (!IsValid) {
      yield put(profileFailure());
    }

    yield put(updateProfileSuccess(payload.data));
  } catch (error) {
    yield put(profileFailure());
  }
}

export default all([
  takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile),
  takeLatest(types.CREATE_PROFILE_REQUEST, createProfile),
]);
