import React from 'react';
import styled from 'styled-components';

import PostCard from '../PostCard';

const Container = styled.ul`
  max-width: 580px;
`;

interface Props {
  profile: any;
  posts: any[];
}

const ProfileThoughts: React.FC<Props> = ({ posts, profile }) => {
  return (
    <Container>
      {posts.map(post => (
        <PostCard key={post.id} post={{ ...post, author: { ...profile } }} me size="small" />
      ))}
    </Container>
  );
};

export default ProfileThoughts;
