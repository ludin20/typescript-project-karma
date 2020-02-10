export const types = {
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@user/UPDATE_PROFILE_FAILURE',
};

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
export function updateProfileFailure() {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
  };
}
