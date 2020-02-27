import React from 'react';
import styled from 'styled-components';

import { discover } from '../../mock';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin-top: 30px;

  img {
    width: 100%;
  }
`;

interface Props {
  children: React.ReactChild;
}

const Popular: React.FC<Props> = () => {
  return (
    <Container>
      {discover.map(item => (
        <img key={item.id} src={item.image} alt="popular" />
      ))}
    </Container>
  );
};

export default Popular;
