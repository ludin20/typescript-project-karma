import { takeLatest, all, put } from 'redux-saga/effects';
import Router from 'next/router';
import cookie from 'js-cookie';

import { defaultProfile } from '../user/reducers';

import { KARMA_SESS } from '../../../common/config';

import {
  signSuccess,
  signFailure,
  authenticateCodeRequest,
  authenticateCodeSuccess,
  authenticateCodeFailure,
  types,
} from './actions';

export function* sign() {
  try {
    yield put(signSuccess());
  } catch (error) {
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

export function signOut() {
  cookie.remove(KARMA_SESS);
  Router.push('/');
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
  takeLatest(types.SIGN_OUT, signOut),
]);
