import React from 'react';
import styled, { css } from 'styled-components';

import Button from '../Button';

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
    }

    span {
      color: #6f767e;
      font-size: 14px;
      margin-top: 5px;
    }
  }
`;

const ProfileImage = styled.img<{ online: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;

  position: relative;

  ${props =>
    props.online &&
    css`
      &::after {
        content: '';
        width: 8px;
        height: 8px;
        background: ${props => props.theme.green};
        border-radius: 50%;

        /*  position: absolute;
        top: 2px;
        right: -10px; */
      }
    `}
`;

const FollowButton = styled(Button)`
  margin-left: 50px;
  font-size: 16px;
`;

interface Props {
  children: React.ReactChild;
}

const WhoToFollowCard: React.FC<Props> = ({ id, name, username, profileImageUrl, following, online }: any) => {
  return (
    <Container key={id}>
      <div>
        <ProfileImage online={online} src={profileImageUrl} alt={name} />
        <section>
          <strong>{name}</strong>
          <span>{username}</span>
        </section>
      </div>

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

export default WhoToFollowCard;
