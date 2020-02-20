import { NextRouter } from 'next/router';

export const types = {
  SIGN_REQUEST: '@auth/SIGN_REQUEST',
  SIGN_SUCCESS: '@auth/SIGN_SUCCESS',
  AUTHENTICATE_CODE_REQUEST: '@auth/AUTHENTICATE_CODE_REQUEST',
  AUTHENTICATE_CODE_SUCCESS: '@auth/AUTHENTICATE_CODE_SUCCESS',
  SIGN_OUT: '@auth/SIGN_OUT',
  AUTHENTICATE_CODE_FAILURE: '@auth/AUTHENTICATE_CODE_FAILURE',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
};

export function signRequest(number: string) {
  return {
    type: types.SIGN_REQUEST,
    payload: {
      number,
    },
  };
}

export function signSuccess() {
  return {
    type: types.SIGN_SUCCESS,
  };
}

export function authenticateCodeRequest(code: string, router: NextRouter) {
  return {
    type: types.AUTHENTICATE_CODE_REQUEST,
    payload: {
      code,
      router,
    },
  };
}

export function authenticateCodeSuccess(token: string, user: {}) {
  return {
    type: types.AUTHENTICATE_CODE_SUCCESS,
    payload: {
      token,
      user,
    },
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}

export function signFailure() {
  return {
    type: types.SIGN_FAILURE,
  };
}

export function authenticateCodeFailure() {
  return {
    type: types.AUTHENTICATE_CODE_FAILURE,
  };
}
