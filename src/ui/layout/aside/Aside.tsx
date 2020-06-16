import React from 'react';
import styled from 'styled-components';

import WhoToFollow from './WhoToFollow';
import ReferandEarn from './ReferandEarn';

const Container = styled.div`
  min-width: 368px;
  margin-right: 30px;
  padding-bottom: 20px;

  position: fixed;
  top: 110px;
  bottom: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1440px) {
    left: 1000px;
    margin-left: 15px;
  }

  @media (max-width: 1440px) {
    right: 0;
  }

  @media (max-width: 1200px) {
    min-width: 300px;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const Split =styled.div`
  margin-bottom: 16px;
`;

interface Props {
  followers: Array<any>;
}

const Aside: React.FC<Props> = ({ followers }) => {
  return (
    <Container>
      <WhoToFollow data={followers} />
      <Split />
      
      {/* Refer & Earn */}
      {/* <ReferandEarn data={followers} />
      <Split /> */}

      {/* <Trending /> */}
    </Container>
  );
};

export default Aside;
