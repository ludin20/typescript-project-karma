import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import Router from 'next/router';
import cookie from 'js-cookie';
import { parsePhoneNumber } from 'react-phone-number-input';
import jwt from 'jsonwebtoken';
import publicIP from 'public-ip';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import * as waxjs from '@waxio/waxjs/dist';

ScatterJS.plugins(new ScatterEOS());

import { RootState } from '../ducks/rootReducer';
import {
  signSuccess,
  signFailure,
  authenticateCodeRequest,
  authenticateCodeSuccess,
  authenticateCodeFailure,
  signOutSuccess,
  types,
  signRequest,
  AuthState,
  resendCodeRequest,
  resendCodeSuccess,
} from '../ducks/auth';
import { defaultProfile } from '../ducks/user';

import { KARMA_TYPE, KARMA_SESS, REQUEST_JWT, RESPONSE_JWT, KARMA_AUTHOR, NODE_ENV } from '../../common/config';
import api from '../../services/api';

export function* sign({ payload }: ReturnType<typeof signRequest>) {
  try {
    const { number } = payload;
    const phoneNumber = parsePhoneNumber(number);
    const ip = yield call(publicIP.v4);

    const body = {
      phone: phoneNumber.nationalNumber,
      country_code: phoneNumber.countryCallingCode,
      domain_id: 1,
      device_id: 1,
      ip_address: ip,
      facebook_id: '',
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const { data } = yield call(api.post, 'profile/registerphone', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid, UserGuid, Author } = decodedData.response;

    if (!IsValid) {
      yield put(signFailure());
    } else {
      yield put(signSuccess(UserGuid, Author));

      if (process.env.NODE_ENV !== 'test') {
        const href = '/auth/[tab]';
        const as = `/auth/validate`;
        Router.push(href, as, { shallow: true });
      }
    }
  } catch (error) {
    yield put(signFailure());
  }
}

export function* resendCode({ payload }: ReturnType<typeof resendCodeRequest>) {
  try {
    const { Author, UserGuid } = payload;

    const body = {
      userguid: UserGuid,
      author: Author,
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const { data } = yield call(api.post, 'profile/resendvalidatecode', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { IsValid } = decodedData.response;

    if (!IsValid) {
      yield put(signFailure());
    } else {
      yield put(resendCodeSuccess());
    }
  } catch (error) {
    yield put(signFailure());
  }
}

export function* authenticateCode({ payload }: ReturnType<typeof authenticateCodeRequest>) {
  try {
    const accounttype = 'phone';
    const { code } = payload;

    const { UserGuid, Author: ReducerAuthor }: AuthState = yield select((state: RootState) => state.auth);
    const ip = yield call(publicIP.v4);

    const body = {
      phone_code: code,
      userguid: UserGuid,
      author: ReducerAuthor,
      domain_id: 1,
      device_id: 1,
      ip_address: ip,
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    const { data } = yield call(api.post, 'profile/validatephonecode', encodedBody);
    const decodedData = jwt.decode(data, RESPONSE_JWT);
    const { private_key, response } = decodedData;
    const { Author, IsValid } = response;

    if (!IsValid) {
      yield put(authenticateCodeFailure());
    } else {
      yield put(authenticateCodeSuccess(private_key, defaultProfile));

      cookie.set(KARMA_SESS, private_key, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_AUTHOR, Author, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_TYPE, accounttype, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      Router.push('/home');
    }
  } catch (error) {
    yield put(authenticateCodeFailure());
  }
}

export function* signOut() {
  Router.push('/auth/sign');
  cookie.remove(KARMA_SESS);
  cookie.remove(KARMA_AUTHOR);
  cookie.remove(KARMA_TYPE);
  yield put(signOutSuccess());
}

export function* signWithScatter() {
  const accounttype = 'scatter';
  const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: 'wax.greymass.com',
    port: 443,
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  };
  try {
    ScatterJS.scatter.connect('KARMA').then(connected => {
      // User does not have Scatter Desktop, Mobile or Classic installed
      if (!connected) {
        return;
      }
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts: [network] };
      scatter
        .getIdentity(requiredFields)
        .then(() => {
          const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
          if (account.authority == 'active') {
            const private_key = account.publicKey;
            const Author = account.name;
            put(authenticateCodeSuccess(private_key, defaultProfile));
            cookie.set(KARMA_SESS, private_key, { expires: NODE_ENV !== 'development' ? 1 : 10 });
            cookie.set(KARMA_AUTHOR, Author, { expires: NODE_ENV !== 'development' ? 1 : 10 });
            cookie.set(KARMA_TYPE, accounttype, { expires: NODE_ENV !== 'development' ? 1 : 10 });
            Router.push('/home');
            window.ScatterJS = null;
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export function* signWithWaxCloud() {
  const accounttype = 'waxcloud';
  const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
  autoLogin();

  //checks if autologin is available and calls the normal login function if it is 
  async function autoLogin() {
    const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      const Author = wax.userAccount;
      const publickey = wax.pubKeys;
      const key = publickey[0] + '&&' + publickey[1];
      put(authenticateCodeSuccess(key, defaultProfile));
      cookie.set(KARMA_SESS, key, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_AUTHOR, Author, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_TYPE, accounttype, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      Router.push('/home');
    } else {
      login();
    }
  }

  //normal login. Triggers a popup for non-whitelisted dapps
  async function login() {
    try {
      const Author = await wax.login();
      const publickey = wax.pubKeys;
      const key = publickey[0] + '&&' + publickey[1];
      put(authenticateCodeSuccess(key, defaultProfile));
      cookie.set(KARMA_SESS, key, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_AUTHOR, Author, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      cookie.set(KARMA_TYPE, accounttype, { expires: NODE_ENV !== 'development' ? 1 : 10 });
      Router.push('/home');
    } catch (e) {}
  }
}

export default all([
  takeLatest(types.SIGN_REQUEST, sign),
  takeLatest(types.RESEND_CODE_REQUEST, resendCode),
  takeLatest(types.AUTHENTICATE_CODE_REQUEST, authenticateCode),
  takeLatest(types.SIGN_OUT_REQUEST, signOut),
  takeLatest(types.SIGN_SCATTER_REQUEST, signWithScatter),
  takeLatest(types.SIGN_WAXCLOUD_REQUEST, signWithWaxCloud),
]);
