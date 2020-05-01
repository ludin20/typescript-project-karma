import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { Title, Balance, WalletActions } from '../ui';
import { labels } from '../ui/layout';

import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';
import { fetchStakedBalance, fetchBalance, fetchAccountInfo } from "../services/Auth";
import { getWAXUSDPrice, getEOSPrice } from "../services/config";
import { actionRequest, actionSuccess, actionFailure } from '../store/ducks/action';

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
  const dispatch = useDispatch();
  const accountName = cookie.get(KARMA_AUTHOR);
  const [usdPrice, setUsdPrice] = useState(0);
  const [eosPrice, setEosPrice] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [waxAmount, setWaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    _fetchBalance();
  }, []);

  const _fetchBalance = async () => {
    try {
      dispatch(actionRequest());
      const [balance, staked, accountInfo] = await Promise.all([fetchBalance(accountName), fetchStakedBalance(accountName),fetchAccountInfo(accountName)]);

      const USDPrice = await getWAXUSDPrice();
      const EOSPrice = await getEOSPrice();
      const WAXAmount = parseFloat(accountInfo.core_liquid_balance && accountInfo.core_liquid_balance.includes(' ') ? accountInfo.core_liquid_balance.split(' ')[0] : 0);
      const TotalAmount = (USDPrice * EOSPrice * (balance + staked) + USDPrice * WAXAmount).toFixed(2);
      setUsdPrice(USDPrice);
      setEosPrice(EOSPrice);
      setBalanceAmount(balance);
      setStakedAmount(staked);
      setWaxAmount(WAXAmount);
      setTotalAmount(TotalAmount);
      dispatch(actionSuccess());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('xqq', e, 'qqqq');
      dispatch(actionFailure());
    }
  };

  return (
    <>
      <Title shouldHideHeader>Wallet</Title>

      <Container>
        <Balance
          stakedAmount={stakedAmount}
          totalAmount={totalAmount ? totalAmount : '0.00'}
          onRefresh={_fetchBalance}
        />

        <WalletActions
          usdPrice={usdPrice}
          eosPrice={eosPrice}
          stakedAmount={stakedAmount}
          balanceAmount={balanceAmount}
          waxAmount={waxAmount}
          onRefresh={_fetchBalance}
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

export default withAuthSync(withApollo({ ssr: true })(Wallet));
