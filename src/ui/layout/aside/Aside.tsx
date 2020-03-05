import React from 'react';
import styled from 'styled-components';

import WhoToFollow from './WhoToFollow';
import Trending from './Trending';

const Container = styled.div`
  min-width: 368px;
  margin-right: 30px;

  position: fixed;
  top: 110px;
  right: 0;

  @media (max-width: 1200px) {
    min-width: 300px;
  }

  @media (max-width: 1100px) {
    display: none;
  }
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
