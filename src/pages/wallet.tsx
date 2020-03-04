import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Title, Balance, WalletActions } from '../ui';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  margin-top: 20px;
  border-radius: 25px;
`;

const Wallet: NextPage = () => {
  return (
    <>
      <Title>Wallet</Title>

      <Container>
        <Balance />

        <WalletActions />
      </Container>
    </>
  );
};

Wallet.getInitialProps = async () => {
  return {
    meta: {
      title: 'Karma/Wallet',
    },
  };
};

export default Wallet;
