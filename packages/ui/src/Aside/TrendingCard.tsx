import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

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
      font-size: 16px;
    }

    span {
      color: #6f767e;
      font-size: 14px;
      margin-top: 5px;
    }
  }
`;

const FollowButton = styled(Button)`
  font-size: 16px;
`;

const TrendingCard: React.FC = ({ id, hashtag, count, following }: any) => {
  return (
    <Container key={id}>
      <section>
        <strong>{hashtag}</strong>
        <span>{count} Posts</span>
      </section>

      <FollowButton
        background={following && 'lightGreen'}
        border={!following}
        radius="rounded"
        color={following ? '#26CC8B' : null}
      >
        {!following ? 'Follow' : 'Following'}
      </FollowButton>
    </Container>
  );
};

export default TrendingCard;
