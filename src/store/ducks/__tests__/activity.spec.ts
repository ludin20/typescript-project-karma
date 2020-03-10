import reducer, { INITIAL_STATE } from '../activity';
import * as Actions from '../activity';

describe('Activity reducers', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it(Actions.types.READ_NOTIFICATIONS_REQUEST, () => {
    const state = reducer(INITIAL_STATE, Actions.readNotificationsRequest());

    expect(state).toStrictEqual({ notifications: 10, loading: true });
  });

  it(Actions.types.READ_NOTIFICATIONS_SUCCESS, () => {
    const state = reducer(INITIAL_STATE, Actions.readNotificationsSuccess());

    expect(state).toStrictEqual({ notifications: 0, loading: false });
  });

  it(Actions.types.READ_NOTIFICATIONS_FAILURE, () => {
    const state = reducer(INITIAL_STATE, Actions.readNotificationsFailure());

    expect(state).toStrictEqual({ notifications: 10, loading: false });
  });
});
