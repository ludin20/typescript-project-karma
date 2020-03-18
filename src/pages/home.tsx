import React from 'react';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { withApollo } from '../apollo/Apollo';
import { GET_PROFILE } from '../apollo/resolvers';
import { KARMA_AUTHOR } from '../common/config';

import { Title, PostCard } from '../ui';
import { labels } from '../ui/layout';

import { feed } from '../mock';

const Container = styled.div``;

const Posts = styled.ul`
  margin-top: 20px;
`;

interface Props {
  data: any;
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Container>
      <Title withDropDown>Feed</Title>

      <Posts>
        {feed.map(post => (
          <PostCard key={post.id} post={post} withFollowButton={false} />
        ))}
      </Posts>
    </Container>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

Home.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  ctx.apolloClient.writeData({
    data: {
      accountName: author,
    },
  });

  const { data } = await ctx.apolloClient.query({
    query: GET_PROFILE,
    variables: { accountname: author, localUser: author, domainID: 1 },
  });

  return {
    layoutConfig: { layout: labels.DEFAULT },
    data,
    meta: {
      title: 'Karma/Feed',
    },
  };
};

export default withAuthSync(withApollo({ ssr: true })(Home));
