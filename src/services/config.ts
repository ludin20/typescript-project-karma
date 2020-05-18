import { KARMA_SESS, KARMA_AUTHOR, EOS_URL, REQUEST_JWT, RESPONSE_JWT, PUB_KEY, TOKEN_NEWDEX } from '../common/config';

import JsProvider from './JsProvider';
import karmaApi from './api';
import { set } from './set';

import { Api, JsonRpc } from 'eosjs';
import cookie from 'js-cookie';
import encoding from 'text-encoding';
import jwt from 'jsonwebtoken';
const qs = require('querystring');
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs16';

ScatterJS.plugins(new ScatterEOS());

export const rpc = new JsonRpc(EOS_URL, { fetch });
export const signatureProvider = new JsProvider();

const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new encoding.TextDecoder(),
  textEncoder: new encoding.TextEncoder(),
});

export const tx = async (name: string, data: any, path: string, contract = 'thekarmadapp') => {
  const accountName = cookie.get(KARMA_AUTHOR);
  const theObj = path ? set(data, path, accountName) : data;
  const accountType = cookie.get(KARMA_SESS);
  if (accountType == 'scatter') {
    require('isomorphic-fetch');
    const network = {
      blockchain: 'eos',
      protocol: 'https',
      host: 'wax.greymass.com',
      port: 443,
      chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    };
    try {
      ScatterJS.scatter.connect('KARMA', { network }).then(connected => {
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
            const eosOptions = { expireInSeconds: 60 };
            const eos = scatter.eos(network, Eos, eosOptions);

            eos
              .transaction(
                {
                  actions: [
                    {
                      account: contract,
                      name: name,
                      authorization: [
                        {
                          actor: account.name,
                          permission: account.authority,
                        },
                      ],
                      data: theObj,
                    },
                  ],
                },
                // {
                //   broadcast: true,
                //   sign: true,
                // },
              )
              .then(result => {
                return result;
              })
              .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  } else {
    try {
      const blocksBehind = 3;
      const info = await api.rpc.get_info();
      const refBlock = await api.rpc.get_block(info.head_block_num - blocksBehind);

      const availableKeys = await api.signatureProvider.getAvailableKeys();

      const body = {
        action: name,
        contract: contract,
        account_name: accountName,
        data: JSON.stringify(theObj),
        domain_id: 1,
        ref_block_prefix: refBlock.id,
        ref_block_num: refBlock.block_num,
        expiration: refBlock.timestamp,
        pub_key: availableKeys[0],
      };

      const encodedBody = {
        data: jwt.sign(body, REQUEST_JWT),
      };

      const response = await karmaApi.post('/profile/dappplz', encodedBody);
      const decodedResponse = jwt.decode(response.data, RESPONSE_JWT);
      const { SignedTx, SerializedTx } = decodedResponse.response;

      const allSigs = [SignedTx];
      const serializedTransaction = Buffer.from(SerializedTx, 'hex');
      const transaction = {
        actions: [
          {
            account: contract,
            name: name,
            authorization: [
              {
                actor: contract,
                permission: 'active',
              },
              {
                actor: accountName,
                permission: 'active',
              },
            ],
            data: theObj,
          },
        ],
      };

      const abis = await api.getTransactionAbis(transaction);
      availableKeys.unshift(PUB_KEY);

      const requiredKeys = await api.authorityProvider.getRequiredKeys({ transaction, availableKeys });
      const args = {
        chainId: info.chain_id,
        requiredKeys,
        serializedTransaction,
        abis,
      };

      const sigs = await api.signatureProvider.sign(args);
      allSigs.push(sigs[0]);

      const result = await api.pushSignedTransaction({
        signatures: allSigs,
        serializedTransaction: serializedTransaction,
      });

      return result;
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }
};

export const logtask = async (accountName: string, param: any) => {
  try {
    accountName = cookie.get(KARMA_AUTHOR);
    const body = {
      account_name: accountName,
      param: param,
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    return new Promise((resolve, reject) => {
      karmaApi
        .post('/gamification/logtask', encodedBody)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

export const follow = async (accountName: string, willFollow: string) => {
  try {
    const myAccountName = cookie.get(KARMA_AUTHOR);
    const body = {
      myaccountname: myAccountName,
      accountname: accountName,
      willfollow: willFollow,
      domain_id: 1,
    };
    const encodedBody = {
      data: jwt.sign(body, REQUEST_JWT),
    };

    return new Promise((resolve, reject) => {
      karmaApi
        .post('/profile/follow', encodedBody)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

export const playVideo = async (post_id: number | string) => {
  try {
    const body = {
      post_id: post_id,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return new Promise((resolve, reject) => {
      karmaApi
        .post('/post/playvideo', qs.stringify(body), config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
};

export const getWAXUSDPrice = async () => {
  // dev only: https://cors-anywhere.herokuapp.com/
  return fetch(`https://cors-anywhere.herokuapp.com/https://newdex.io/api/common/getLegalCurrencyPrices?valuationCoins=WAX&legalCurrency=USD`)
    .then(res => res.json())
    .then(response => {
      return response.prices[0];
    })
    .catch(err => console.log('err: ', err));
};

export const getEOSPrice = async () => {
  return fetch(`https://api.newdex.io/v1/ticker?symbol=` + TOKEN_NEWDEX)
    .then(res => res.json())
    .then(response => {
      return response.data.last;
    })
    .catch(err => console.log('err: ', err));
};
