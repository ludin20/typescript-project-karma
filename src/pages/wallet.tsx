import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Title, Balance, WalletActions } from '../ui';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  margin-top: 20px;
  border-radius: 25px;

  @media (max-width: 700px) {
    margin-top: 0;
    border-radius: 0 0 25px 25px;
  }
`;

const Wallet: NextPage = () => {
  return (
    <>
      <Title shouldHideHeader>Wallet</Title>

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
    layoutConfig: { shouldHideHeader: true },
  };
};

export default Wallet;
