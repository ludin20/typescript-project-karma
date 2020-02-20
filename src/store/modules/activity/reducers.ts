import produce from 'immer';

import { types } from './actions';

export interface ActivityState {
  notifications: number;
  loading: boolean;
}

export const INITIAL_STATE: ActivityState = {
  notifications: 10,
  loading: false,
};

export default function activity(state = INITIAL_STATE, action) {
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
