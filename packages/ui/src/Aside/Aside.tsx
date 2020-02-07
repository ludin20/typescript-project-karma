import React from 'react';
import styled from 'styled-components';

import WhoToFollow from './WhoToFollow';
import Trending from './Trending';

const Container = styled.div`
  width: calc(100% - 550px);
  margin: 30px 0 0 50px;
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
