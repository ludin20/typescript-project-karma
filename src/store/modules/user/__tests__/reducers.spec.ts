import reducer, { INITIAL_STATE, defaultProfile } from '../reducers';
import * as UserActions from '../actions';
import * as AuthActions from '../../auth/actions';

const profile = {
  name: 'thename',
  username: '@thename',
  bio: 'a cool test',
  website: 'www.coolwebsite.test',
};

describe('User reducers', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it(UserActions.types.CREATE_PROFILE_REQUEST, () => {
    const state = reducer(INITIAL_STATE, UserActions.createProfileRequest(profile));

    expect(state).toStrictEqual({ loading: true, profile: defaultProfile });
  });

  /* it(UserActions.types.CREATE_PROFILE_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, UserActions.createProfileSuccess(profile));

    expect(state).toStrictEqual({ loading: false, profile: { ...INITIAL_STATE, ...profile } });
  }); */

  it(UserActions.types.UPDATE_PROFILE_REQUEST, () => {
    const state = reducer(INITIAL_STATE, UserActions.updateProfileRequest(profile));

    expect(state).toStrictEqual({ loading: true, profile: defaultProfile });
  });

  /* it(UserActions.types.UPDATE_PROFILE_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, UserActions.updateProfileSuccess(profile));

    expect(state).toStrictEqual({ loading: false, profile });
  }); */

  it(UserActions.types.PROFILE_FAILURE, () => {
    const state = reducer(INITIAL_STATE, UserActions.profileFailure());

    expect(state).toStrictEqual({ profile: defaultProfile, loading: false });
  });

  it(AuthActions.types.AUTHENTICATE_CODE_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, AuthActions.authenticateCodeSuccess('123456', profile));

    expect(state).toStrictEqual({ profile, loading: false });
  });

  it(AuthActions.types.SIGN_OUT, () => {
    const state = reducer(INITIAL_STATE, AuthActions.signOut());

    expect(state).toStrictEqual({ profile: defaultProfile, loading: false });
  });
});
