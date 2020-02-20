import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin-top: 30px;

  img {
    max-width: calc(580px / 3);
  }
`;

interface Props {
  posts: any[];
}

const ProfileMedia: React.FC<Props> = ({ posts }) => {
  return (
    <Container>
      {posts.map(item => (
        <img key={item.id} src={item.image} alt="post" />
      ))}
    </Container>
  );
};

export default ProfileMedia;
