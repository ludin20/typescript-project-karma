import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Title, PostCard } from '../ui';

import { feed } from '../mock';

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

Home.getInitialProps = async () => {
  return {
    meta: {
      title: 'Karma/Feed',
    },
  };
};

export default Home;
