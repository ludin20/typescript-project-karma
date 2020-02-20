import React from 'react';
import styled from 'styled-components';

import AsideCard from './AsideCard';
import WhoToFollowCard from './WhoToFollowCard';

const Container = styled.div``;

const WhoToFollow: React.FC = () => {
  const data = [
    {
      id: 1,
      name: 'Jean',
      username: '@jeanfoton',
      profileImageUrl: `https://api.adorable.io/avatars/100/jean`,
      following: false,
    },
    {
      id: 2,
      name: 'Dallas',
      username: '@dallaskarma',
      profileImageUrl: `https://api.adorable.io/avatars/100/dallas`,
      following: true,
      online: true,
    },
    {
      id: 3,
      name: 'Dimitri',
      username: '@dimitrifoton',
      profileImageUrl: `https://api.adorable.io/avatars/100/dimitri`,
      following: false,
    },
  ];

  return (
    <Container>
      <AsideCard title="Who to follow" seeMore="discover/whoToFollow" data={data} renderItem={WhoToFollowCard} />
    </Container>
  );
};

export default WhoToFollow;
