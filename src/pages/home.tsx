import React from 'react';
import styled from 'styled-components';

import { Title, PostCard, Layout, Seo } from '../ui';

import { feed } from '../mock';

const Container = styled.div``;

const Posts = styled.ul`
  margin-top: 20px;
`;

const Home: React.FC = () => {
  return (
    <Layout>
      <Seo title="Karma/Feed" />
      <Container>
        <Title withDropDown>Feed</Title>

        <Posts>
          {feed.map(post => (
            <PostCard key={post.id} post={post} withFollowButton={false} />
          ))}
        </Posts>
      </Container>
    </Layout>
  );
};

export default Home;
