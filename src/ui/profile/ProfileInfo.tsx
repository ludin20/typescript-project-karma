import React from 'react';
import styled from 'styled-components';

import link from '../assets/link.svg';

import ProfileInfoHeader from './ProfileInfoHeader';
import ProfileActions from './ProfileActions';

const Container = styled.div`
  > p {
    max-width: 250px;
    color: #fff;
    font-size: 20px;
    line-height: 1.4;
    margin: 12px 0 10px;
    padding-left: 16px;
    text-align: left;

    position: relative;

    &::after {
      content: '';
      width: 8px;
      height: 100%;
      transform: matrix(-1, 0, 0, -1, 0, 0);
      background: linear-gradient(180deg, #26cc8b 0%, #26cd8e 26%, #2adce8 100%);
      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media (max-width: 550px) {
    > p {
      font-size: 18px;
    }
  }
`;

const WebSite = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;

  img {
    width: 18px;
    margin-bottom: 4px;
  }

  a {
    margin-left: 6px;
    color: #2996dd;
    font-size: 18px;
  }

  @media (max-width: 550px) {
    a {
      font-size: 16px;
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
  bio: string;
  website: string;
  handleModal?: () => void;
  following?: boolean;
  followsMe?: boolean;
}

const ProfileInfo: React.FC<Props> = ({
  avatar,
  name,
  username,
  me,
  isVerified,
  power,
  website,
  handleModal,
  following,
  followsMe,
  ...props
}) => {
  const bio = props.bio ? props.bio.split('\n') : [];

  return (
    <Container {...props}>
      <ProfileInfoHeader
        isVerified={isVerified}
        avatar={avatar}
        name={name}
        username={username}
        me={me}
        power={power}
        handleModal={handleModal}
        following={following}
        followsMe={followsMe}
      />

      {bio.length > 0 && (
        <p>
          {bio.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      )}
      {website && (
        <WebSite>
          <img src={link} alt="link" />
          <a>{website}</a>
        </WebSite>
      )}

      {!me && (
        <ProfileActions
          me={me}
          power={power}
          handleModal={handleModal}
          following={following}
          name={name}
          username={username}
          avatar={avatar}
          mobile
        />
      )}
    </Container>
  );
};

export default ProfileInfo;
