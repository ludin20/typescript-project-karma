import produce from 'immer';

export const types = {
  ACTION_REQUEST: '@activity/ACTION_REQUEST',
  ACTION_SUCCESS: '@activity/ACTION_SUCCESS',
  ACTION_FAILURE: '@activity/ACTION_FAILURE',
};

export interface ActionState {
  loading: boolean;
}

export const INITIAL_STATE: ActionState = {
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.ACTION_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.ACTION_SUCCESS: {
        draft.loading = false;
        break;
      }
      case types.ACTION_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

export function actionRequest() {
  return {
    type: types.ACTION_REQUEST,
  };
}

export function actionSuccess() {
  return {
    type: types.ACTION_SUCCESS,
  };
}

export function actionFailure() {
  return {
    type: types.ACTION_FAILURE,
  };
}
