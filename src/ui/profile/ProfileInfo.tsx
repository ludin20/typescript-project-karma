import React from 'react';
import styled from 'styled-components';

import link from '../assets/link.svg';

import FormattedText from '../common/FormattedText';

import ProfileInfoHeader from './ProfileInfoHeader';
import ProfileActions from './ProfileActions';

const Container = styled.div`
  > div:nth-child(2) {
    max-width: 350px;
    overflow: hidden;
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
  author?: string;
  me?: boolean;
  isVerified?: boolean;
  bio: string;
  website: string;
  handleModal?: () => void;
  onFollowSuccess?: (boolean) => void;
  following?: boolean;
  followsMe?: boolean;
  wax: number;
  eos: number;
  liquidBalance: number;
  currentPower: number;
}

const ProfileInfo: React.FC<Props> = ({
  avatar,
  name,
  username,
  author,
  me,
  isVerified,
  website,
  handleModal,
  onFollowSuccess,
  following,
  followsMe,
  bio,
  wax,
  eos,
  liquidBalance,
  currentPower,
  ...props
}) => {
  return (
    <Container {...props}>
      <ProfileInfoHeader
        isVerified={isVerified}
        avatar={avatar}
        name={name}
        username={'@' + username}
        me={me}
        author={author}
        wax={wax}
        eos={eos}
        liquidBalance={liquidBalance}
        currentPower={currentPower}
        handleModal={handleModal}
        onFollowSuccess={onFollowSuccess}
        following={following}
        followsMe={followsMe}
      />

      {bio && (
        <div>
          <FormattedText font={{ color: '#fff', size: '20px', weight: 'normal' }} content={bio} withoutBr />
        </div>
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
          wax={wax}
          eos={eos}
          liquidBalance={liquidBalance}
          currentPower={currentPower}
          handleModal={handleModal}
          following={following}
          author={author}
          onFollowSuccess={onFollowSuccess}
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
