import React from 'react';
import styled from 'styled-components';

import WhoToFollow from './WhoToFollow';
import Trending from './Trending';

const Container = styled.div`
  min-width: 368px;
  margin: 30px 30px 0 0;
`;

const Aside: React.FC = () => {
  return (
    <Container>
      <WhoToFollow />

      <Trending />
    </Container>
  );
};

export default Aside;
