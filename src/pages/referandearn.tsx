import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { Title, Stats, InviteNow, ReferedUsers } from '../ui';
import { labels } from '../ui/layout';

import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';

const Container = styled.div`
  width: 100%;
  height: 45vh;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  border-radius: 0 0 25px 25px;
  padding: 60px 100px;

  @media (max-width: 700px) {
    margin-top: 0;
    border-radius: 0 0 25px 25px;
  }

  > h1 {
    font-size: 54px;
    font-weight: 900;
    margin-bottom: 25px;
  }

  > h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 45px;
  }
`;

const InviteNowContent = styled.div`
  width: 50%;
  display: inline-block;
  padding-right: 10px;
  
  @media (max-width: 1024px) { {
    width: 100%;
    padding-right: 0px;
  }
`;

const StatsContent = styled.div`
  width: 50%;
  display: inline-block;
  padding-left: 10px;

  @media (max-width: 1024px) { {
    width: 100%;
    padding-left: 0px;
  }
`;

const ReferedUsersContent = styled.div`
  width: 100%;
  display: inline-block;
  padding-left: 10px;
  min-height: 40vh;
  margin-top: 20px;
`;

interface Props {
  profile: any;
}

const ReferandEarn: NextPage<Props> = ({ profile }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <h1>Invite Friends & Earn</h1>
        <h3>Earn 200 KARMA For Every Friend You Invite To KARMA</h3>
        <InviteNowContent><InviteNow /></InviteNowContent>
        <StatsContent><Stats /></StatsContent>
        <ReferedUsersContent><ReferedUsers /></ReferedUsersContent>
      </Container>
    </>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

ReferandEarn.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  ctx.apolloClient.writeData({
    data: {
      accountName: author,
    },
  });

  return {
    layoutConfig: { layout: labels.REFERANDEARN, shouldHideHeader: true },
    meta: {
      title: 'Refer & Earn',
    },
    author,
  };
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(ReferandEarn)));
