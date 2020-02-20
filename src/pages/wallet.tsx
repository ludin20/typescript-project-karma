import React from 'react';

import { Title } from '../ui';

import Layout from '../modules/layout/Layout';
import WalletContainer from '../modules/wallet/WalletContainer';

const Wallet: React.FC = () => {
  return (
    <Layout>
      <Title>Wallet</Title>

      <WalletContainer />
    </Layout>
  );
};

export default Wallet;
