import { takeLatest, all, put } from 'redux-saga/effects';

import { signSuccess, signFailure, authenticateCodeSuccess, authenticateCodeFailure, types } from './actions';

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

export function* authenticateCode({ payload }) {
  try {
    const { code, router } = payload;

    setTimeout(() => {
      console.log('code authenticated', code); //eslint-disable-line no-console
    }, 1000);

    yield put(authenticateCodeSuccess('12345', {}));
    router.push('/home');
  } catch (error) {
    yield put(authenticateCodeFailure());
  }
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
]);
