import produce from 'immer';

import returnAvatarUrl from '../util/returnAvatarUrl';

import { types as authTypes } from './auth';

export const types = {
  CREATE_PROFILE_REQUEST: '@user/CREATE_PROFILE_REQUEST',
  CREATE_PROFILE_SUCCESS: '@user/CREATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  PROFILE_FAILURE: '@user/PROFILE_FAILURE',
};

export interface ProfileProps {
  avatar?: string | File;
  name: string;
  username: string;
  bio: string;
  website: string;
  followers?: string | number;
  power?: string | number;
  following?: string | number;
  posts?: string | number;
  isVerified?: boolean;
  currentPower?: string | number;
  liquidBalance?: string | number;
  unstaking?: string | number;
}

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

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.AUTHENTICATE_CODE_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case authTypes.SIGN_OUT_SUCCESS: {
        draft.profile = null;
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
        draft.profile = { ...defaultProfile, ...action.payload.user };
        draft.loading = false;
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

export function createProfileRequest(data: ProfileProps) {
  const { avatar } = data;

  return {
    type: types.CREATE_PROFILE_REQUEST,
    payload: {
      data: {
        ...data,
        avatar: returnAvatarUrl(avatar),
      },
    },
  };
}

export function createProfileSuccess(user: ProfileProps) {
  return {
    type: types.CREATE_PROFILE_SUCCESS,
    payload: {
      user,
    },
  };
}

export function updateProfileRequest(data) {
  const { avatar } = data;

  return {
    type: types.UPDATE_PROFILE_REQUEST,
    payload: {
      data: {
        ...data,
        avatar: returnAvatarUrl(avatar),
      },
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

export function profileFailure() {
  return {
    type: types.PROFILE_FAILURE,
  };
}
