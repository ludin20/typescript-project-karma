import React from 'react';
import styled from 'styled-components';

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

      &:nth-child(2) {
        margin-top: 10px;
      }
    }

    strong {
      font-size: 24px;
      font-weight: 900;
    }

    span {
      font-size: 16px;
      color: ${props => props.theme.lightBlue};
    }
  }
`;

interface Props {
  avatar: string;
  name: string;
  username: string;
  me?: boolean;
  isVerified: boolean;
  power: string | number;
  handleModal?: () => void;
  following?: boolean;
  followsMe?: boolean;
}

const ProfileInfoHeader: React.FC<Props> = ({
  isVerified,
  avatar,
  name,
  username,
  me,
  power,
  handleModal,
  following,
  followsMe,
}) => {
  return (
    <Container>
      <section>
        <div>
          <strong>{name}</strong>
          {isVerified && <img src={verified} alt="verified" />}
        </div>
        <div>
          <span>{username}</span>
          {!me && followsMe && <div>Follows You</div>}
        </div>
      </section>

      <ProfileActions
        me={me}
        power={power}
        handleModal={handleModal}
        following={following}
        name={name}
        username={username}
        avatar={avatar}
      />
    </Container>
  );
};

export default ProfileInfoHeader;
