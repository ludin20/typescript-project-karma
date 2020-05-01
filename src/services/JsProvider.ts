import { KARMA_SESS } from '../common/config';

import * as ecc from 'eosjs-ecc';
import cookie from 'js-cookie';

export default class JsSignatureProvider {
  public commitPrivateKey(privateKey: string) {
    if (!ecc.isValidPrivate(privateKey)) throw new Error('Private key is not valid.');
    localStorage.setItem('privateKey', privateKey);
  }

  public getAvailableKeys() {
    const privateKey = cookie.get(KARMA_SESS);
    const publicKey = ecc.privateToPublic(privateKey);
    return [publicKey];
  }

  public destroyKey() {
    localStorage.removeItem('privateKey');
  }

  public sign({ chainId, requiredKeys, serializedTransaction }) {
    const signBuf = Buffer.concat([
      new Buffer(chainId, 'hex'),
      new Buffer(serializedTransaction),
      new Buffer(new Uint8Array(32)),
    ]);
    const privateKey = cookie.get(KARMA_SESS);
    return requiredKeys.map(pub => ecc.Signature.sign(signBuf, privateKey).toString());
  }
}
