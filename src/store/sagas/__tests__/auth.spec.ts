import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import jwt from 'jsonwebtoken';

import { types, signSuccess, authenticateCodeFailure, authenticateCodeSuccess } from '../../ducks/auth';
import { sign, authenticateCode } from '../auth';
import { defaultProfile } from '../../ducks/user';
import { RESPONSE_JWT } from '../../../common/config';
import api from '../../../services/api';

const apiMock = new MockAdapter(api);

afterEach(apiMock.reset);

describe('Auth sagas', () => {
  it('should be able to sign and receive code', async () => {
    const response = jwt.sign({ response: { IsValid: true, UserGuid: '123456', Author: 'teste12345' } }, RESPONSE_JWT);
    apiMock.onPost('profile/registerphone').reply(200, response);

    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      sign({ type: types.SIGN_REQUEST, payload: { number: '+5541952566326' } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(signSuccess('123456', 'teste12345'));
  });

  it('should be able to authenticate code', async () => {
    const response = jwt.sign(
      { response: { IsValid: true, UserGuid: '123456', Author: 'teste12345' }, private_key: '123456' },
      RESPONSE_JWT,
    );
    apiMock.onPost('profile/validatephonecode').reply(200, response);

    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '123456' } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeSuccess('123456', defaultProfile));
  });

  it('should not complete sign when code validation fails', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      authenticateCode({ type: types.AUTHENTICATE_CODE_REQUEST, payload: { code: '124344444' } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(authenticateCodeFailure());
  });
});
