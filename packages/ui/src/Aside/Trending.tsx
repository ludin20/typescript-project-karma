import React from 'react';
import styled from 'styled-components';

import AsideCard from './AsideCard';
import TrendingCard from './TrendingCard';

const Container = styled.div`
  margin-top: 30px;
`;

const WhoToFollow: React.FC = () => {
  const data = [
    {
      id: 1,
      hashtag: '#budapest',
      count: '1,253',
      following: false,
    },
    {
      id: 2,
      hashtag: '#losangeleslakers',
      count: '876',
      following: true,
    },
    {
      id: 3,
      hashtag: '#jimmydore',
      count: '643',
      following: false,
    },
    {
      id: 4,
      hashtag: '#citypainting',
      count: '375',
      following: false,
    },
  ];

  return (
    <Container>
      <AsideCard title="Trending Topics" data={data} renderItem={TrendingCard} />
    </Container>
  );
};

export default WhoToFollow;
