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
      {posts.map(item => (
        <PostCard
          key={item.id}
          id={item.id}
          date={item.date}
          likes={item.likes}
          comments={item.comments}
          reTweets={item.recycles}
          item={item.tips}
          item2={item.power}
          content={item.content}
          author={profile}
          me
          size="small"
        />
      ))}
    </Container>
  );
};

export default ProfileThoughts;
