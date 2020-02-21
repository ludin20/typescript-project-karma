import Router from 'next/router';

import { takeLatest, all, put } from 'redux-saga/effects';

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
    setTimeout(() => {
      console.log('code sent'); //eslint-disable-line no-console
    }, 1000);

    yield put(signSuccess());
  } catch (error) {
    yield put(signFailure());
  }
}

export function* authenticateCode({ payload }: ReturnType<typeof authenticateCodeRequest>) {
  try {
    const { code, router } = payload;

    setTimeout(() => {
      console.log('code authenticated', code); //eslint-disable-line no-console
    }, 1000);

    if (code !== '123456') throw new Error();

    yield put(authenticateCodeSuccess('123456', {}));

    if (process.env.NODE_ENV !== 'test') {
      Router.push('/home');
    }
  } catch (error) {
    yield put(authenticateCodeFailure());
  }
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
]);
