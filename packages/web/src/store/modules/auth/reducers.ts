import produce from 'immer';

import { types as userTypes } from '../user/actions';

import { types as authTypes } from './actions';

export interface AuthState {
  token: string | null;
  signed: boolean;
  loading: boolean;
  codeSent: boolean;
  isNewUser: boolean;
}

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  codeSent: false,
  isNewUser: true,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.SIGN_REQUEST: {
        draft.loading = true;
        break;
      }
      case authTypes.SIGN_SUCCESS: {
        draft.loading = false;
        draft.codeSent = true;
        break;
      }
      case authTypes.AUTHENTICATE_CODE_REQUEST: {
        draft.loading = true;
        break;
      }
      case authTypes.AUTHENTICATE_CODE_SUCCESS: {
        draft.loading = false;
        draft.token = action.payload.token;
        break;
      }
      case authTypes.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        draft.codeSent = false;
        draft.isNewUser = true;
        break;
      }
      case authTypes.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case authTypes.AUTHENTICATE_CODE_FAILURE: {
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
