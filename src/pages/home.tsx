import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import nextCookie from 'next-cookies';

import { withAuthSync } from '../auth/WithAuthSync';
import { Title, PostCard } from '../ui';

import { feed } from '../mock';
import { KARMA_SESS } from '../common/config';
import { withApollo } from '../apollo/Apollo';

const Container = styled.div``;

const Posts = styled.ul`
  margin-top: 20px;
`;

const Home: NextPage = () => {
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

Home.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);

  const jwt = cookies[encodeURIComponent(KARMA_SESS)];
  // apolloClient is in the ctx

  //request comes here

  return {
    meta: {
      title: 'Karma/Feed',
    },
  };
};

export default withAuthSync(withApollo({ ssr: true })(Home));
