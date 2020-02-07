import produce from 'immer';

import { types } from './actions';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  codeSent: false,
};

export default function auth(state = INITIAL_STATE, action) {
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
        draft.loading = true;
        break;
      }
      case types.AUTHENTICATE_CODE_SUCCESS: {
        draft.loading = false;
        draft.token = action.payload.token;
        break;
      }
      case types.SIGN_OUT: {
        draft.signed = false;
        draft.codeSent = false;
        draft.token = null;
        break;
      }
      case types.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case types.AUTHENTICATE_CODE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
