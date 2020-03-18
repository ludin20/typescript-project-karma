import { takeLatest, all, put, call } from 'redux-saga/effects';
import Router from 'next/router';
import cookie from 'js-cookie';
import { parsePhoneNumber } from 'react-phone-number-input';
import jwt from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';

import {
  signSuccess,
  signFailure,
  authenticateCodeRequest,
  authenticateCodeSuccess,
  authenticateCodeFailure,
  signOutSuccess,
  types,
  signRequest,
} from '../ducks/auth';
import { defaultProfile } from '../ducks/user';

import { KARMA_SESS, REQUEST_JWT, SERVER_URL, RESPONSE_JWT } from '../../common/config';

export function* sign({ payload }: ReturnType<typeof signRequest>) {
  try {
    const { number } = payload;
    const phoneNumber = parsePhoneNumber(number);

    const body = {
      phone: phoneNumber.nationalNumber,
      country_code: phoneNumber.countryCallingCode,
      domain_id: 1,
      device_id: 1,
      ip_address: '127.0.0.1',
      facebook_id: '',
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(encodedBody),
    };

    const fetchResponse = yield call(fetch, `${SERVER_URL}/profile/registerphone`, request);

    const decodedData = jwt.decode(fetchResponse, RESPONSE_JWT);
    const { response } = decodedData;
    console.log(`${SERVER_URL}/profile/registerphone`, fetchResponse, decodedData); //eslint-disable-line no-console

    if (!response.IsValid) {
      yield put(signFailure());
    }

    const { UserGuid } = response;
    const { author } = response;

    console.log(UserGuid, author); //eslint-disable-line no-console

    yield put(signSuccess());
  } catch (error) {
    console.log(error); //eslint-disable-line no-console
    yield put(signFailure());
  }
}

export function* authenticateCode({ payload }: ReturnType<typeof authenticateCodeRequest>) {
  try {
    const { code } = payload;

    if (code.length > 6) throw new Error();

    const jwt = code.concat('blablablabla');

    yield put(authenticateCodeSuccess(jwt, defaultProfile));

    if (process.env.NODE_ENV !== 'test') {
      cookie.set(KARMA_SESS, jwt, { expires: 1 });
      Router.push('/home');
    }
  } catch (error) {
    yield put(authenticateCodeFailure());
  }
}

export function* signOut() {
  cookie.remove(KARMA_SESS);
  Router.push('/');
  yield put(signOutSuccess());
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
  takeLatest(types.SIGN_OUT_REQUEST, signOut),
]);
