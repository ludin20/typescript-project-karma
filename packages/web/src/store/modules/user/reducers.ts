import produce from 'immer';

import { types as authTypes } from '../auth/actions';

import { types as userTypes } from './actions';

export interface UserState {
  profile: {};
  loading: boolean;
}

const INITIAL_STATE = {
  profile: {},
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.AUTHENTICATE_CODE_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case authTypes.SIGN_OUT: {
        draft.profile = {};
        break;
      }
      case userTypes.CREATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case userTypes.CREATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case userTypes.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case userTypes.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case userTypes.PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
