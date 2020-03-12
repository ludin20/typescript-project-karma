import reducer, { INITIAL_STATE } from '../auth';
import * as Actions from '../auth';
import { defaultProfile } from '../user';

describe('Auth reducers', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it(Actions.types.SIGN_REQUEST, () => {
    const state = reducer(INITIAL_STATE, Actions.signRequest('+5511954951157'));

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: true, signed: false, token: null });
  });

  it(Actions.types.SIGN_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, Actions.signSuccess());

    expect(state).toStrictEqual({ codeSent: true, isNewUser: true, loading: false, signed: false, token: null });
  });

  it(Actions.types.AUTHENTICATE_CODE_REQUEST, () => {
    const state = reducer(INITIAL_STATE, Actions.authenticateCodeRequest('123456'));

    expect(state).toStrictEqual({ codeSent: true, isNewUser: true, loading: true, signed: false, token: null });
  });

  it(Actions.types.AUTHENTICATE_CODE_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, Actions.authenticateCodeSuccess('123456', defaultProfile));

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: false, signed: true, token: '123456' });
  });

  it(Actions.types.SIGN_OUT_REQUEST, () => {
    const state = reducer(INITIAL_STATE, Actions.signOutRequest());

    expect(state).toStrictEqual({ ...INITIAL_STATE, loading: true });
  });

  it(Actions.types.SIGN_OUT_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, Actions.signOutSuccess());

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: false, signed: false, token: null });
  });

  it(Actions.types.AUTHENTICATE_CODE_FAILURE, () => {
    const state = reducer(INITIAL_STATE, Actions.authenticateCodeFailure());

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: false, signed: false, token: null });
  });

  it(Actions.types.SIGN_FAILURE, () => {
    const state = reducer(INITIAL_STATE, Actions.signFailure());

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: false, signed: false, token: null });
  });
});
