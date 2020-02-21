import React from 'react';
import styled from 'styled-components';

import FollowButton from '../FollowButton';
import ProfileImage from '../ProfileImage';

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
      font-size: 22px;
      font-weight: 900;
    }

    span {
      color: #6f767e;
      font-size: 22px;
      margin-top: 5px;
    }
  }
`;

interface Props {
  children: React.ReactChild;
}

const WhoToFollowCard: React.FC<Props> = ({ id, name, username, profileImageUrl, following, online }: any) => {
  return (
    <Container key={id}>
      <div>
        <ProfileImage online={online} path={profileImageUrl} alt={name} size="small" />
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
