import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { Title, Balance, WalletActions } from '../ui';
import { labels } from '../ui/layout';

import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';
import { getWalletRequest } from '../store/ducks/user';

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

interface Props {
  profile: any;
}

const Wallet: NextPage<Props> = ({ profile }) => {
  const dispatch = useDispatch();
  const { wax, eos, liquidBalance, currentPower, waxBalance } = profile;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const TotalAmount = wax * eos * (liquidBalance + currentPower) + wax * waxBalance;
    setTotalAmount(TotalAmount);
  }, [currentPower, eos, liquidBalance, wax, waxBalance]);

  const _fetchBalance = () => {
    dispatch(getWalletRequest());
  };

  return (
    <>
      <Title shouldHideHeader>Wallet</Title>

      <Container>
        <Balance
          currentPower={currentPower ? currentPower : 0}
          totalAmount={totalAmount ? totalAmount.toFixed(2) : '0.00'}
          onRefresh={_fetchBalance}
        />

        <WalletActions
          wax={wax ? wax : 0}
          eos={eos ? eos : 0}
          currentPower={currentPower ? currentPower : 0}
          liquidBalance={liquidBalance ? Math.floor(liquidBalance) : 0}
          waxBalance={waxBalance ? waxBalance : 0}
        />
      </Container>
    </>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

Wallet.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  ctx.apolloClient.writeData({
    data: {
      accountName: author,
    },
  });

  return {
    layoutConfig: { layout: labels.DEFAULT, shouldHideHeader: true },
    meta: {
      title: 'Karma/Wallet',
    },
    author,
  };
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(Wallet)));
