import React from 'react';
import styled from 'styled-components';

import { whoToFollow } from '../../../mock';

import AsideCard from './AsideCard';
import WhoToFollowCard from './WhoToFollowCard';

const Container = styled.div``;

interface Props {
  data: Array<any>;
}

const WhoToFollow: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <AsideCard title="Who to follow" seeMore="/whotofollow" data={data} renderItem={WhoToFollowCard} />
    </Container>
  );
};

export default WhoToFollow;
