import React from 'react';
import styled from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import PostCard from '../post/PostCard';
import InfinityScroll from '../common/InfinityScroll';

const Container = styled.ul`
  width: 100%;
`;

interface Props {
  profile: any;
  posts: any[];
}

const ProfileThoughts: React.FC<Props> = ({ posts, profile }) => {
  return (
    <InfinityScroll length={posts.length}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Container>
          {posts.map(post => (
            <PostCard key={post.id} post={{ ...post, author: { ...profile } }} me size="small" />
          ))}
        </Container>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default ProfileThoughts;
