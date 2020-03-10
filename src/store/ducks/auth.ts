import produce from 'immer';

import { types as userTypes } from './user';

export const types = {
  SIGN_REQUEST: '@auth/SIGN_REQUEST',
  SIGN_SUCCESS: '@auth/SIGN_SUCCESS',
  AUTHENTICATE_CODE_REQUEST: '@auth/AUTHENTICATE_CODE_REQUEST',
  AUTHENTICATE_CODE_SUCCESS: '@auth/AUTHENTICATE_CODE_SUCCESS',
  SIGN_OUT: '@auth/SIGN_OUT',
  AUTHENTICATE_CODE_FAILURE: '@auth/AUTHENTICATE_CODE_FAILURE',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
};

export interface AuthState {
  token: string | null;
  signed: boolean;
  loading: boolean;
  codeSent: boolean;
  isNewUser: boolean;
}

export const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  codeSent: false,
  isNewUser: true,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.SIGN_SUCCESS: {
        draft.loading = false;
        draft.codeSent = true;
        break;
      }
      case types.AUTHENTICATE_CODE_REQUEST: {
        draft.codeSent = true;
        draft.loading = true;
        break;
      }
      case types.AUTHENTICATE_CODE_SUCCESS: {
        draft.signed = true;
        draft.loading = false;
        draft.token = action.payload.token;
        break;
      }
      case types.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        draft.codeSent = false;
        draft.isNewUser = true;
        break;
      }
      case types.SIGN_FAILURE: {
        draft.codeSent = false;
        draft.loading = false;
        break;
      }
      case types.AUTHENTICATE_CODE_FAILURE: {
        draft.codeSent = false;
        draft.loading = false;
        break;
      }
      case userTypes.CREATE_PROFILE_SUCCESS: {
        draft.isNewUser = false;
        break;
      }
      default:
    }
  });
}

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

export function authenticateCodeRequest(code: string) {
  return {
    type: types.AUTHENTICATE_CODE_REQUEST,
    payload: {
      code,
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
