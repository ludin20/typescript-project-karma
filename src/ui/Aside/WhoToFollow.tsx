import React from 'react';
import styled from 'styled-components';

import { whoToFollow } from '../../mock';

import AsideCard from './AsideCard';
import WhoToFollowCard from './WhoToFollowCard';

const Container = styled.div``;

const WhoToFollow: React.FC = () => {
  return (
    <Container>
      <AsideCard title="Who to follow" seeMore="discover/whoToFollow" data={whoToFollow} renderItem={WhoToFollowCard} />
    </Container>
  );
};

export default WhoToFollow;
