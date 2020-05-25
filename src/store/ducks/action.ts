import produce from 'immer';

export const types = {
  ACTION_REQUEST: '@activity/ACTION_REQUEST',
  ACTION_SUCCESS: '@activity/ACTION_SUCCESS',
  ACTION_FAILURE: '@activity/ACTION_FAILURE',
  HASMORE_TURE: '@activity/HASMORE_TURE',
  HASMORE_FAILURE: '@activity/HASMORE_FAILURE',
  VIEWFORM_TRUE: '@activity/VIEWFORM_TRUE',
  VIEWFORM_FALSE: '@activity/VIEWFORM_FALSE',
};

export interface ActionState {
  loading: boolean;
  hasMore: boolean;
  viewForm: boolean;
}

export const INITIAL_STATE: ActionState = {
  loading: false,
  hasMore: true,
  viewForm: true,
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
      case types.HASMORE_TURE: {
        draft.hasMore = true;
        break;
      }
      case types.HASMORE_FAILURE: {
        draft.hasMore = false;
        break;
      }
      case types.VIEWFORM_TRUE: {
        draft.viewForm = true;
        break;
      }
      case types.VIEWFORM_FALSE: {
        draft.viewForm = false;
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

export function hasMoreTrue() {
  return {
    type: types.HASMORE_TURE,
  };
}

export function hasMoreFalse() {
  return {
    type: types.HASMORE_FAILURE,
  };
}
export function viewFormTrue() {
  return {
    type: types.VIEWFORM_TRUE,
  };
}

export function viewFormFalse() {
  return {
    type: types.VIEWFORM_FALSE,
  };
}
