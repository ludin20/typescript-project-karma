import produce from 'immer';

export const types = {
  ACTION_REQUEST: '@activity/ACTION_REQUEST',
  ACTION_SUCCESS: '@activity/ACTION_SUCCESS',
  ACTION_FAILURE: '@activity/ACTION_FAILURE',
  HASMORE_TURE: '@activity/HASMORE_TURE',
  HASMORE_FAILURE: '@activity/HASMORE_FAILURE',
  VIEWFORM_TRUE: '@activity/VIEWFORM_TRUE',
  VIEWFORM_FALSE: '@activity/VIEWFORM_FALSE',
  FILE_UPLOAD_STATUS: '@activity/FILE_UPLOAD_STATUS',
  FILE_UPLOAD_START: '@activity/FILE_UPLOAD_START',
  FILE_UPLOAD_END: '@activity/FILE_UPLOAD_END',
};

export interface ActionState {
  loading: boolean;
  hasMore: boolean;
  viewForm: boolean;
  uploadPercent: number;
  isUploading: boolean;
}

export const INITIAL_STATE: ActionState = {
  loading: false,
  hasMore: true,
  viewForm: true,
  uploadPercent: 0,
  isUploading: false,
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
      case types.FILE_UPLOAD_START: {
        draft.isUploading = true;
        break;
      }
      case types.FILE_UPLOAD_END: {
        draft.isUploading = false;
        draft.uploadPercent = 0;
        break;
      }
      case types.FILE_UPLOAD_STATUS: {
        draft.uploadPercent = action.payload.percent;
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

export function fileUploadStart() {
  return {
    type: types.FILE_UPLOAD_START,
  };
}

export function fileUploadEnd() {
  return {
    type: types.FILE_UPLOAD_END,
  };
}

export function uploadPercent(percent: number) {
  return {
    type: types.FILE_UPLOAD_STATUS,
    payload: {
      percent,
    },
  };
}
