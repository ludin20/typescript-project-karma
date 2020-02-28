import React from 'react';
import styled from 'styled-components';

import { trending } from '../../mock';

import AsideCard from './AsideCard';
import TrendingCard from './TrendingCard';

const Container = styled.div`
  margin-top: 30px;
`;

const WhoToFollow: React.FC = () => {
  return (
    <Container>
      <AsideCard title="Trending Topics" data={trending} renderItem={TrendingCard} />
    </Container>
  );
};

export default WhoToFollow;
