import returnAvatarUrl from '../../util/returnAvatarUrl';

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
