import React from 'react';
import styled, { css } from 'styled-components';

import verified from '../assets/verified.png';

import ProfileActions from './ProfileActions';

const Container = styled.header`
  margin-top: 14px;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  > section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;

    > div {
      display: flex;
      align-items: center;

      img {
        margin-left: 5px;
        height: 26px;
      }

      > div {
        background: ${props => props.theme.dark};
        color: #fff;
        padding: 4px 10px;
        margin-left: 10px;
        font-size: 13px;
        border-radius: 5px;
      }
    }

    strong {
      font-size: 30px;
      font-weight: 900;
    }

    span {
      font-size: 20px;
      color: ${props => props.theme.lightBlue};
    }
  }

  @media (max-width: 550px) {
    > section strong {
      font-size: 24px;
    }

    > section span {
      font-size: 17px;
    }
  }
`;

const Username = styled.div<{ me: boolean; followsMe: boolean }>`
  ${props =>
    !props.me &&
    props.followsMe &&
    css`
      margin-top: 10px;
    `}
`;

interface Props {
  avatar: string;
  name: string;
  username: string;
  author?: string;
  me?: boolean;
  isVerified: boolean;
  handleModal?: () => void;
  onFollowSuccess?: (boolean) => void;
  following?: boolean;
  followsMe?: boolean;
  wax: number;
  eos: number;
  currentPower: number;
  liquidBalance: number;
}

const ProfileInfoHeader: React.FC<Props> = ({
  isVerified,
  avatar,
  author,
  name,
  username,
  me,
  handleModal,
  onFollowSuccess,
  following,
  followsMe,
  wax,
  eos,
  currentPower,
  liquidBalance,
}) => {
  return (
    <Container>
      <section>
        <div>
          <strong>{name}</strong>
          {isVerified && <img src={verified} alt="verified" />}
        </div>

        <Username me={me} followsMe={followsMe}>
          <span>{username}</span>
          {!me && followsMe && <div>Follows You</div>}
        </Username>
      </section>

      <ProfileActions
        me={me}
        wax={wax}
        eos={eos}
        liquidBalance={liquidBalance}
        currentPower={currentPower}
        handleModal={handleModal}
        onFollowSuccess={onFollowSuccess}
        following={following}
        author={author}
        name={name}
        username={username}
        avatar={avatar}
      />
    </Container>
  );
};

export default ProfileInfoHeader;
