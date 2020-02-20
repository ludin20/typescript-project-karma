import React from 'react';
import styled from 'styled-components';

import { discover } from '../../mock';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  img {
    max-width: calc(580px / 3);
  }
`;

const New: React.FC = () => {
  return (
    <Container>
      {discover.reverse().map(item => (
        <img key={item.id} src={item.image} alt="new" />
      ))}
    </Container>
  );
};

export default New;
