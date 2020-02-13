import { runSaga } from 'redux-saga';

import { types, createProfileSuccess, updateProfileSuccess, profileFailure } from '../actions';
import { createProfile, updateProfile } from '../sagas';

describe('Auth sagas', () => {
  it('should be able to create profile', async () => {
    const profile = {
      name: 'thename',
      username: '@thename',
      bio: 'a cool test',
      website: 'www.coolwebsite.test',
    };

    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      createProfile({ type: types.CREATE_PROFILE_REQUEST, payload: { data: profile } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(createProfileSuccess(profile));
  });

  it('should not be able to create profile if backend returns error', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      createProfile({ type: types.CREATE_PROFILE_REQUEST, payload: { data: null } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(profileFailure());
  });

  it('should be able to update profile', async () => {
    const profile = {
      name: 'thename',
      username: '@thename',
      bio: 'a cool test',
      website: 'www.coolwebsite.test',
    };

    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      updateProfile({ type: types.UPDATE_PROFILE_REQUEST, payload: { data: profile } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(updateProfileSuccess(profile));
  });

  it('should not be able to update profile if backend returns error', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, () =>
      createProfile({ type: types.UPDATE_PROFILE_REQUEST, payload: { data: null } }),
    ).toPromise();

    expect(dispatch).toHaveBeenCalledWith(profileFailure());
  });
});
