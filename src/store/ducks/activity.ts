import produce from 'immer';

export const types = {
  READ_NOTIFICATIONS_REQUEST: '@activity/READ_NOTIFICATIONS_REQUEST',
  READ_NOTIFICATIONS_SUCCESS: '@activity/READ_NOTIFICATIONS_SUCCESS',
  READ_NOTIFICATIONS_FAILURE: '@activity/READ_NOTIFICATIONS_FAILURE',
};

export interface ActivityState {
  notifications: number;
  loading: boolean;
}

export const INITIAL_STATE: ActivityState = {
  notifications: 0,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.READ_NOTIFICATIONS_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.READ_NOTIFICATIONS_SUCCESS: {
        draft.notifications = 0;
        draft.loading = false;
        break;
      }
      case types.READ_NOTIFICATIONS_REQUEST: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

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
