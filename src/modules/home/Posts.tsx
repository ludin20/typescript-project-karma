import React from 'react';
import styled from 'styled-components';

import PostCard from '../../ui/PostCard';

const Container = styled.ul`
  margin-top: 20px;
`;

interface Props {
  data: any[];
}

const Posts: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {data.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
