import { createRouter } from 'next/router';

import reducer, { INITIAL_STATE } from '../reducers';
import * as Actions from '../actions';

const router = createRouter('', {}, '', {
  subscription: null,
  App: null,
  Component: null,
  initialProps: null,
  pageLoader: null,
  wrapApp: null,
});

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
    const state = reducer(INITIAL_STATE, Actions.authenticateCodeRequest('123456', router));

    expect(state).toStrictEqual({ codeSent: true, isNewUser: true, loading: true, signed: false, token: null });
  });

  it(Actions.types.AUTHENTICATE_CODE_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, Actions.authenticateCodeSuccess('123456', router));

    expect(state).toStrictEqual({ codeSent: false, isNewUser: true, loading: false, signed: true, token: '123456' });
  });

  it(Actions.types.SIGN_OUT, () => {
    const state = reducer(INITIAL_STATE, Actions.signOut());

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
