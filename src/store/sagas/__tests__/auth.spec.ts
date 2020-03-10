import { runSaga } from 'redux-saga';

import { types, signSuccess, authenticateCodeFailure, authenticateCodeSuccess } from '../../ducks/auth';
import { sign, authenticateCode } from '../auth';
import { defaultProfile } from '../../ducks/user';

describe('Auth sagas', () => {
  it('should be able to sign and receive code', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, sign).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signSuccess());
  });

  it('should be able to authenticate code', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '123456' } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeSuccess('123456blablablabla', defaultProfile));
  });

  it('should not complete sign when code validation fails', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '124344444' } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeFailure());
  });
});
