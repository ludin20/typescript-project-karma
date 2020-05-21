import produce from 'immer';

import { types as userTypes } from './user';

export const types = {
  SIGN_REQUEST: '@auth/SIGN_REQUEST',
  SIGN_SUCCESS: '@auth/SIGN_SUCCESS',
  RESEND_CODE_REQUEST: '@auth/RESEND_CODE_REQUEST',
  RESEND_CODE_SUCCESS: '@auth/RESEND_CODE_SUCCESS',
  AUTHENTICATE_CODE_REQUEST: '@auth/AUTHENTICATE_CODE_REQUEST',
  AUTHENTICATE_CODE_SUCCESS: '@auth/AUTHENTICATE_CODE_SUCCESS',
  SIGN_OUT_REQUEST: '@auth/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: '@auth/SIGN_OUT_SUCCESS',
  AUTHENTICATE_CODE_FAILURE: '@auth/AUTHENTICATE_CODE_FAILURE',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
  SIGN_SCATTER_REQUEST: '@auth/SIGN_SCATTER_REQUEST',
  SIGN_WAXCLOUD_REQUEST: '@auth/SIGN_WAXCLOUD_REQUEST',
};

export interface AuthState {
  token: string | null;
  signed: boolean;
  loading: boolean;
  codeSent: boolean;
  isNewUser: boolean;
  UserGuid: string | null;
  Author: string | null;
  number?: string;
}

export const INITIAL_STATE: AuthState = {
  token: null,
  signed: false,
  loading: false,
  codeSent: false,
  isNewUser: true,
  UserGuid: null,
  Author: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SIGN_REQUEST: {
        draft.number = action.payload.number;
        draft.loading = true;
        break;
      }
      case types.SIGN_SUCCESS: {
        draft.loading = false;
        draft.codeSent = true;
        draft.UserGuid = action.payload.UserGuid;
        draft.Author = action.payload.Author;
        break;
      }
      case types.RESEND_CODE_REQUEST: {
        draft.number = action.payload.number;
        draft.loading = true;
        break;
      }
      case types.RESEND_CODE_SUCCESS: {
        draft.loading = false;
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
      case types.SIGN_OUT_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.SIGN_OUT_SUCCESS: {
        draft.token = null;
        draft.signed = false;
        draft.codeSent = false;
        draft.isNewUser = true;
        draft.loading = false;
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
      case types.SIGN_SCATTER_REQUEST: {
        draft.loading = false;
        break;
      }
      case types.SIGN_WAXCLOUD_REQUEST: {
        draft.loading = false;
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

export function signSuccess(UserGuid: string, Author: string) {
  return {
    type: types.SIGN_SUCCESS,
    payload: {
      UserGuid,
      Author,
    },
  };
}

export function resendCodeRequest(UserGuid: string, Author: string) {
  return {
    type: types.RESEND_CODE_REQUEST,
    payload: {
      UserGuid,
      Author,
    },
  };
}

export function resendCodeSuccess() {
  return {
    type: types.RESEND_CODE_SUCCESS,
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

export function signOutRequest() {
  return {
    type: types.SIGN_OUT_REQUEST,
  };
}

export function signOutSuccess() {
  return {
    type: types.SIGN_OUT_SUCCESS,
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

export function authenticateWithScatter() {
  return {
    type: types.SIGN_SCATTER_REQUEST,
  };
}

export function authenticateWithWaxCloud() {
  return {
    type: types.SIGN_WAXCLOUD_REQUEST,
  };
}