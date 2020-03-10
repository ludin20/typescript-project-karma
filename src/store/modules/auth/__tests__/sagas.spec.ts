import { runSaga } from 'redux-saga';
import { createRouter } from 'next/router';

import { types, signSuccess, authenticateCodeFailure, authenticateCodeSuccess } from '../actions';
import { sign, authenticateCode } from '../sagas';
import { defaultProfile } from '../../user/reducers';

const router = createRouter('', {}, '', {
  subscription: null,
  App: null,
  Component: null,
  initialProps: null,
  pageLoader: null,
  wrapApp: null,
});

describe('Auth sagas', () => {
  it('should be able to sign and receive code', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, sign).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signSuccess());
  });

  it('should be able to authenticate code', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '123456', router } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeSuccess('123456blablablabla', defaultProfile));
  });

  it('should not complete sign when code validation fails', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '124344444', router } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeFailure());
  });
});
