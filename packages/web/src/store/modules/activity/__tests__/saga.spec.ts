import { runSaga } from 'redux-saga';

import { readNotificationsSuccess } from '../actions';
import { readNotifications } from '../sagas';

describe('Activity sagas', () => {
  it('should be able to read notifications', async () => {
    const dispatch = jest.fn();
    await runSaga({ dispatch }, readNotifications).toPromise();

    expect(dispatch).toHaveBeenCalledWith(readNotificationsSuccess());
  });
});
