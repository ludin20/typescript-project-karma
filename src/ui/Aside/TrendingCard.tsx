import React from 'react';
import styled from 'styled-components';

import FollowButton from '../FollowButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    strong {
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    span {
      color: #6f767e;
      font-size: 14px;
      margin-top: 5px;
    }
  }
`;

const TrendingCard: React.FC = ({ id, hashtag, count, following }: any) => {
  return (
    <Container key={id}>
      <section>
        <strong>{hashtag}</strong>
        <span>{count} Posts</span>
      </section>

      <FollowButton following={following} />
    </Container>
  );
};

export default TrendingCard;
