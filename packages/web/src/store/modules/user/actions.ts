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
}

export function createProfileRequest(data: ProfileProps) {
  const { avatar } = data;

  if (typeof avatar === 'string' || !avatar) {
    return {
      type: types.CREATE_PROFILE_REQUEST,
      payload: {
        data: {
          ...data,
          avatar,
        },
      },
    };
  } else {
    return {
      type: types.CREATE_PROFILE_REQUEST,
      payload: {
        data: {
          ...data,
          avatar: avatar.preview,
        },
      },
    };
  }
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
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    payload: {
      data,
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
