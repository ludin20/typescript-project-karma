import { TOKEN_CONTRACT } from '../common/config';

import { rpc } from './config';

const parseTokenString = (tokenString: string): { amount: number; symbol: string } => {
  const [amountString, symbol] = tokenString.split(' ');
  const amount = parseFloat(amountString);
  return { amount, symbol };
};

// returns accounts objs with public key matching the permission name
const filterAccounts = (accounts: any[], permissionName: string, publicKey: string): any[] => {
  return accounts.filter(account => {
    const { permissions } = account;
    const seekedPermissions = permissions.filter(permission => permission.perm_name === permissionName);
    const uglyKeys = seekedPermissions.map(permission => permission.required_auth.keys);
    const cleanKeys = [].concat(...uglyKeys);
    const keys = cleanKeys.map(keyObj => keyObj.key);
    const result = keys.filter(key => key === publicKey).length > 0;
    return result;
  });
};

export const fetchAccounts = (public_key: string) =>
  rpc.history_get_key_accounts(public_key).then(res => res.account_names);

/**
 * Fetches accounts with the public key as the active permission
 * will throw if it fails to find one.
 * @param publicKey
 */
export const fetchActiveKeyAccounts = async (publicKey: string): Promise<string[]> => {
  const accountNames = await fetchAccounts(publicKey);
  const accounts = await Promise.all(accountNames.map((accountName: string) => rpc.get_account(accountName)));

  const accountsWithActiveKey = filterAccounts(accounts, 'active', publicKey);

  if (accountsWithActiveKey.length > 0) {
    return accountsWithActiveKey.map(accountObj => accountObj.account_name);
  } else {
    // Check to see if the user entered an owner key instead
    const allAccountsWithOwnerKey = filterAccounts(accounts, 'owner', publicKey);
    if (allAccountsWithOwnerKey.length === 1) {
      throw new Error('singleOwnerKeyPassedError: ' + 'accountName=' + allAccountsWithOwnerKey[0].account_name);
    } else if (allAccountsWithOwnerKey.length > 1) {
      throw new Error('severalOwnerKeyPassedError');
    } else {
      throw new Error('failedToFindAccount');
    }
  }
};

export const fetchAccountInfo = (account_name: string) =>
  rpc
    .get_account(account_name)
    .then(info => info)
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('error while fetching account info');
    });

export const fetchBalance = (account_name: string) =>
  rpc
    .get_currency_balance(TOKEN_CONTRACT, account_name, 'KARMA')
    .then(balanceArray => {
      if (balanceArray.length === 0) return 0;
      const balanceString = balanceArray[0];
      const balanceObj = parseTokenString(balanceString);
      return balanceObj.amount;
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('Failed to get account balance');
    });

export const fetchEOSBalance = (account_name: string) =>
  rpc
    .get_currency_balance('eosio.token', account_name, 'EOS')
    .then(balanceArray => {
      if (balanceArray.length === 0) return 0;
      const balanceString = balanceArray[0];

      const balanceObj = parseTokenString(balanceString);
      return balanceObj.amount;
    })
    // eslint-disable-next-line no-console
    .catch(e => console.log('Failed to get account balance'));

export const fetchStakedBalance = async (account_name: string): Promise<number> => {
  const getPower = tableName =>
    rpc
      .get_table_rows({
        code: TOKEN_CONTRACT,
        table: tableName,
        scope: account_name,
      })
      .then(table => {
        if (table.rows.length === 0) {
          return 0;
        }
        const balanceObj = parseTokenString(table.rows[0].weight);
        return balanceObj.amount;
      });

  const tableResults = await Promise.all([getPower('power'), getPower('powered')]);

  const result = tableResults.filter(r => r > 0);
  if (result.length === 0) return 0;
  return result[0];
};
