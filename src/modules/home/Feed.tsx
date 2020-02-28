import React from 'react';
import styled from 'styled-components';

import { Title, PostCard } from '../../ui';

import Layout from '../layout/Layout';
import { feed } from '../../mock';

const Container = styled.div``;

const Posts = styled.ul`
  margin-top: 20px;
`;

const Feed: React.FC = () => {
  return (
    <Layout>
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

export default Feed;
