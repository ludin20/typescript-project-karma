import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';

import {
  createProfileRequest,
  createProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  profileFailure,
  types,
  defaultProfile,
} from '../ducks/user';
import { REQUEST_JWT, RESPONSE_JWT, KARMA_AUTHOR } from '../../common/config';
import api from '../../services/api';
import { getWAXUSDPrice, getEOSPrice } from '../../services/config';
import { fetchBalance, fetchStakedBalance, fetchAccountInfo } from '../../services/Auth';

export function* createProfile({ payload }: ReturnType<typeof createProfileRequest>) {
  try {
    const { bio, username, displayname, hash } = payload.data;

    const body = {
      author: cookie.get(KARMA_AUTHOR),
      usernameOrig: payload.oldData.username,
      usernameNew: username,
      hash,
      bio,
      displayname: displayname,
      domain_id: 1,
    };

    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };
    const { data } = yield call(api.post, 'profile/changeprofile', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid } = decodedData.response;

    if (!IsValid) {
      yield put(createProfileSuccess(defaultProfile));
      payload.action && payload.action();
    } else {
      yield put(profileFailure());
    }
  } catch (error) {
    yield put(profileFailure());
  }
}

export function* updateProfile({ payload }: ReturnType<typeof updateProfileRequest>) {
  try {
    const { bio, username, displayname, hash, url } = payload.data;

    const body = {
      author: cookie.get(KARMA_AUTHOR),
      usernameOrig: payload.oldData.username,
      usernameNew: username,
      hash,
      bio,
      displayname: displayname,
      url,
      domain_id: 1,
    };

    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };
    const { data } = yield call(api.post, 'profile/changeprofile', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid } = decodedData.response;

    if (IsValid) {
      yield put(updateProfileSuccess(payload.data));
      payload.action && payload.action();
    } else {
      yield put(profileFailure());
      payload.action && payload.action();
    }
  } catch (error) {
    yield put(profileFailure());
  }
}

export function* getWallet() {
  try {
    const [balance, staked, accountInfo] = yield Promise.all([
      fetchBalance(cookie.get(KARMA_AUTHOR)),
      fetchStakedBalance(cookie.get(KARMA_AUTHOR)),
      fetchAccountInfo(cookie.get(KARMA_AUTHOR)),
    ]);

    const WAXPrice = yield getWAXUSDPrice();
    const EOSPrice = yield getEOSPrice();
    const WAXAmount = parseFloat(
      accountInfo.core_liquid_balance && accountInfo.core_liquid_balance.includes(' ')
        ? accountInfo.core_liquid_balance.split(' ')[0]
        : 0,
    );

    const walletData = {
      wax: WAXPrice,
      eos: EOSPrice,
      waxBalance: WAXAmount,
      liquidBalance: balance,
      currentPower: staked,
    };

    yield put(updateProfileSuccess(walletData));
  } catch (error) {
    yield put(profileFailure());
  }
}

export default all([
  takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile),
  takeLatest(types.CREATE_PROFILE_REQUEST, createProfile),
  takeLatest(types.GET_WALLET_REQUEST, getWallet),
]);
