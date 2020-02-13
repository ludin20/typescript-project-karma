export const types = {
  READ_NOTIFICATIONS_REQUEST: '@activity/READ_NOTIFICATIONS_REQUEST',
  READ_NOTIFICATIONS_SUCCESS: '@activity/READ_NOTIFICATIONS_SUCCESS',
  READ_NOTIFICATIONS_FAILURE: '@activity/READ_NOTIFICATIONS_FAILURE',
};

export function readNotificationsRequest() {
  return {
    type: types.READ_NOTIFICATIONS_REQUEST,
  };
}

export function readNotificationsSuccess() {
  return {
    type: types.READ_NOTIFICATIONS_SUCCESS,
  };
}

export function readNotificationsFailure() {
  return {
    type: types.READ_NOTIFICATIONS_FAILURE,
  };
}
