import React from 'react';
import styled from 'styled-components';

import { Layout, Title, Balance, WalletActions } from '../ui';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  margin-top: 20px;
  border-radius: 25px;
`;

const Wallet: React.FC = () => {
  return (
    <Layout>
      <Title>Wallet</Title>

      <Container>
        <Balance />

        <WalletActions />
      </Container>
    </Layout>
  );
};

export default Wallet;
