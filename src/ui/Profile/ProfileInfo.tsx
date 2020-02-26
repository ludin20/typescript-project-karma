import React from 'react';
import styled from 'styled-components';

import ProfileInfoHeader from './ProfileInfoHeader';

const Container = styled.div`
  > p {
    max-width: 250px;
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
    margin: 12px 0 6px;
    padding-left: 16px;
    text-align: left;

    position: relative;

    &::after {
      content: '';
      width: 5px;
      height: 100%;
      background: ${props => props.theme.green};
      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
    }
  }

  > a {
    color: #2996dd;
    font-size: 18px;
    margin-left: 10px;
  }
`;

interface Props {
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
      {website && <a>{website}</a>}
    </Container>
  );
};

export default ProfileInfo;
