import produce from 'immer';

import { types as authTypes } from '../auth/actions';

import { types as userTypes, ProfileProps } from './actions';

export interface UserState {
  profile: ProfileProps;
  loading: boolean;
}

export const defaultProfile: ProfileProps = {
  name: 'Full Name',
  username: '@username',
  bio: '',
  followers: 0,
  power: 0,
  following: 0,
  website: '',
  posts: 0,
  isVerified: false,
  currentPower: 0,
  liquidBalance: 0,
  unstaking: 0,
};

export const INITIAL_STATE: UserState = {
  profile: defaultProfile,
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
        draft.profile = defaultProfile;
        break;
      }
      case userTypes.CREATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case userTypes.CREATE_PROFILE_SUCCESS: {
        draft.profile = { ...defaultProfile, ...action.payload.user };
        draft.loading = false;
        break;
      }
      case userTypes.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case userTypes.UPDATE_PROFILE_SUCCESS: {
        draft.profile = { ...defaultProfile, ...action.payload.user };
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
