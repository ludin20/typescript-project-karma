export const types = {
  CREATE_PROFILE_REQUEST: '@user/CREATE_PROFILE_REQUEST',
  CREATE_PROFILE_SUCCESS: '@user/CREATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  PROFILE_FAILURE: '@user/PROFILE_FAILURE',
};

export interface ProfileProps {
  name: string;
  username: string;
  bio: string;
  website: string;
}

export function createProfileRequest(data: ProfileProps) {
  return {
    type: types.CREATE_PROFILE_REQUEST,
    payload: {
      data,
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
