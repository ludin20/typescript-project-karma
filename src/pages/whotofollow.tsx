import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import graphql from 'graphql-tag';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { Title, Space, InfinityScroll, GoBackButton } from '../ui';

import { labels } from '../ui/layout';
import WhoToFollowCard from '../ui/layout/aside/WhoToFollowCard';

import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';

const GET_FOLLOWERS = graphql`
  query Profile($accountname: String!) {
    profile(accountname: $accountname) @rest(type: "Profile", path: "profile/{args.accountname}/whotofollow") {
      author
      hash
      displayname
      username
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 20px 0 0;
  }

  @media (max-width: 350px) {
    button + div {
      display: none;
    }
  }
`;

interface Props {
  profile: any;
  data: any;
}

const WhoToFollow: NextPage<Props> = ({ profile, data }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setFollowers(
      data.map((item: { author: string }) => ({
        ...item,
        isFollowing: !!profile.following.find(follow => follow == item.author),
      })),
    );
  }, [data, profile.following]);

  return (
    <>
      <TitleWrapper>
        <GoBackButton />
        <Title>Who To Follow</Title>
      </TitleWrapper>
      <Space height={20} />
      <InfinityScroll length={followers.length} loadMore={null} hasMore={false}>
        {followers.map((follow, index) => (
          <React.Fragment key={String(index)}>
            {index > 0 && <Space height={40} />}
            <WhoToFollowCard {...follow} />
          </React.Fragment>
        ))}
      </InfinityScroll>
    </>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

WhoToFollow.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  const { data } = await ctx.apolloClient.query({
    query: GET_FOLLOWERS,
    variables: {
      accountname: author,
    },
  });

  return {
    layoutConfig: { layout: labels.DEFAULT, shouldHideCreatePost: true },
    meta: {
      title: 'Karma/WhoToFollow',
    },
    data: data.profile,
  };
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(WhoToFollow)));
