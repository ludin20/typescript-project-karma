import React from 'react';
import styled from 'styled-components';

import Avatar from '../../common/Avatar';
import FollowButton from '../../common/FollowButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    strong {
      color: #fff;
      font-size: 16px;
      font-weight: 900;
    }

    span {
      color: #6f767e;
      font-size: 16px;
    }
  }

  @media (max-width: 1200px) {
    div + button {
      display: none;
    }
  }
`;

interface Props {
  children: React.ReactChild;
}

const WhoToFollowCard: React.FC<Props> = ({ id, name, username, avatar, following, online }: any) => {
  return (
    <Container key={id}>
      <div>
        <Avatar online={online} src={avatar} alt={name} />
        <section>
          <strong>{name}</strong>
          <span>{username}</span>
        </section>
      </div>

      <FollowButton following={following} />
    </Container>
  );
};

export default WhoToFollowCard;
