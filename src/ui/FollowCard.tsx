import React from 'react';
import styled from 'styled-components';

import { Avatar, FollowButton } from './index';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 30px;
  }

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
      font-size: 15px;
      font-weight: 900;
    }

    span {
      color: #6f767e;
      font-size: 15px;
      margin-top: 2px;
    }
  }
`;

interface Props {
  follow: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    following: boolean;
    online: boolean;
  };
}

const FollowCard: React.FC<Props> = ({ follow }) => {
  const { online, avatar, name, username, following } = follow;
  return (
    <Container>
      <div>
        <Avatar online={online} path={avatar} alt={name} />
        <section>
          <strong>{name}</strong>
          <span>{username}</span>
        </section>
      </div>

      <FollowButton following={following} />
    </Container>
  );
};

export default FollowCard;
