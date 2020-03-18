import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import Router from 'next/router';
import cookie from 'js-cookie';
import { parsePhoneNumber } from 'react-phone-number-input';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import publicIP from 'public-ip';

import { RootState } from '../ducks/rootReducer';
import {
  signSuccess,
  signFailure,
  authenticateCodeRequest,
  authenticateCodeSuccess,
  authenticateCodeFailure,
  signOutSuccess,
  types,
  signRequest,
  AuthState,
} from '../ducks/auth';
import { defaultProfile } from '../ducks/user';

import { KARMA_SESS, REQUEST_JWT, SERVER_URL, RESPONSE_JWT, KARMA_AUTHOR } from '../../common/config';

export function* sign({ payload }: ReturnType<typeof signRequest>) {
  try {
    const { number } = payload;
    const phoneNumber = parsePhoneNumber(number);
    const ip = yield call(publicIP.v4);

    const body = {
      phone: phoneNumber.nationalNumber,
      country_code: phoneNumber.countryCallingCode,
      domain_id: 1,
      device_id: 1,
      ip_address: ip,
      facebook_id: '',
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const { data } = yield call(axios.post, `${SERVER_URL}/profile/registerphone`, encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid, UserGuid, Author } = decodedData.response;

    if (!IsValid) {
      yield put(signFailure());
    }

    yield put(signSuccess(UserGuid, Author));

    if (process.env.NODE_ENV !== 'test') {
      const href = '/auth/[tab]';
      const as = `/auth/validate`;
      Router.push(href, as, { shallow: true });
    }
  } catch (error) {
    yield put(signFailure());
  }
}

export function* authenticateCode({ payload }: ReturnType<typeof authenticateCodeRequest>) {
  try {
    const { code } = payload;

    const { UserGuid, Author: ReducerAuthor }: AuthState = yield select((state: RootState) => state.auth);
    const ip = yield call(publicIP.v4);

    const body = {
      phone_code: code,
      userguid: UserGuid,
      author: ReducerAuthor,
      domain_id: 1,
      device_id: 1,
      ip_address: ip,
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const { data } = yield call(axios.post, `${SERVER_URL}/profile/validatephonecode`, encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { private_key, response } = decodedData;
    const { Author, IsValid } = response;

    if (!IsValid) {
      yield put(authenticateCodeFailure());
    }

    yield put(authenticateCodeSuccess(private_key, defaultProfile));

    if (process.env.NODE_ENV !== 'test') {
      cookie.set(KARMA_SESS, private_key, { expires: 1 });
      cookie.set(KARMA_AUTHOR, Author, { expires: 1 });
      Router.push('/home');
    }
  } catch (error) {
    yield put(authenticateCodeFailure());
  }
}

export function* signOut() {
  cookie.remove(KARMA_SESS);
  Router.push('/auth/sign');
  yield put(signOutSuccess());
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
  takeLatest(types.SIGN_OUT_REQUEST, signOut),
]);
