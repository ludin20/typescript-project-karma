import React from 'react';
import styled from 'styled-components';

import { discoverNew } from '../../mock';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin-top: 30px;

  img {
    width: 100%;
  }
`;

const New: React.FC = () => {
  return (
    <Container>
      {discoverNew.map(item => (
        <img key={item.id} src={item.image} alt="new" />
      ))}
    </Container>
  );
};

export default New;
