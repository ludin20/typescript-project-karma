import produce from 'immer';

import returnAvatarUrl from '../util/returnAvatarUrl';

import { types as authTypes } from './auth';

export const types = {
  CREATE_PROFILE_REQUEST: '@user/CREATE_PROFILE_REQUEST',
  CREATE_PROFILE_SUCCESS: '@user/CREATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  GET_WALLET_REQUEST: '@user/GET_WALLET_REQUEST',
  PROFILE_FAILURE: '@user/PROFILE_FAILURE',
};

export interface ProfileProps {
  avatar?: string | File;
  displayname: string;
  username: string;
  hash?: string;
  bio: string;
  url: string;
  followers?: Array<string>;
  power?: string | number;
  following?: Array<string>;
  posts?: string | number;
  isVerified?: boolean;
  wax?: number;
  eos?: number;
  currentPower?: number;
  liquidBalance?: number;
  unstaking?: string | number;
  upvoted: Array<string>;
}

export interface UserState {
  profile: ProfileProps;
  loading: boolean;
}

export const defaultProfile: ProfileProps = {
  displayname: 'Full Name',
  username: 'username',
  hash: '',
  bio: '',
  followers: [],
  power: 0,
  following: [],
  url: '',
  posts: 0,
  isVerified: false,
  wax: 0,
  eos: 0,
  currentPower: 0,
  liquidBalance: 0,
  unstaking: 0,
  upvoted: [],
};

export const INITIAL_STATE: UserState = {
  profile: defaultProfile,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.AUTHENTICATE_CODE_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case authTypes.SIGN_OUT_SUCCESS: {
        draft.profile = defaultProfile;
        break;
      }
      case types.CREATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.CREATE_PROFILE_SUCCESS: {
        draft.profile = { ...defaultProfile, ...action.payload.user };
        draft.loading = false;
        break;
      }
      case types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = { ...draft.profile, ...action.payload.user };
        draft.loading = false;
        break;
      }
      case types.GET_WALLET_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

interface Profile {
  displayname: string;
  username: string;
  bio: string;
  hash: string;
  url: string;
}
export function createProfileRequest(data: Profile, oldData: Profile, action: any) {
  return {
    type: types.CREATE_PROFILE_REQUEST,
    payload: {
      data,
      oldData,
      action,
    },
  };
}

export function createProfileSuccess(user) {
  return {
    type: types.CREATE_PROFILE_SUCCESS,
    payload: {
      user,
    },
  };
}

export function updateProfileRequest(data: Profile, oldData: Profile, action: any) {
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    payload: {
      data,
      oldData,
      action,
    },
  };
}

export function updateProfileSuccess(user) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: {
      user,
    },
  };
}

export function getWalletRequest() {
  return {
    type: types.GET_WALLET_REQUEST,
  };
}

export function profileFailure() {
  return {
    type: types.PROFILE_FAILURE,
  };
}
