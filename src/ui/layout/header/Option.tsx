import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';

import Avatar from '../../common/Avatar';
import FollowButton from '../../common/FollowButton';

import verified from '../../assets/verified.png';

import { useS3Image } from '../../../hooks';

import Space from '../../common/Space';

import { UserProps } from './Header';

const Container = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;

    div {
      display: flex;
      align-items: flex-end;

      img {
        margin-left: 4px;
        height: 20px;
        margin-bottom: 4px;
      }
    }

    strong {
      color: #fff;
      font-size: 16px;
      font-weight: 900;
    }

    span {
      margin-top: 0;
      font-size: 16px;
      color: #6f767e;
    }
  }

  @media (max-width: 700px) {
    section > strong {
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;

  @media (max-width: 860px) {
    width: 40px !important;
    height: 40px !important;
  }
`;

const Button = styled(FollowButton)`
  width: 115px;

  display: flex !important;
  align-items: center;
  justify-content: center;

  @media (max-width: 860px) {
    width: unset;
    padding: 6px 15px;
    font-size: 14px;
  }
`;

interface Props {
  profile: UserProps;
  onBlur(): void;
}

const Option: React.FC<Props> = ({ profile, onBlur }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const href = '/profile/[username]/[tab]';
    const as = `/profile/${profile.author}/media`;
    onBlur();
    router.push(href, as, { shallow: true });
  }, [router, profile, onBlur]);

  const avatar = useS3Image(profile.hash, 'thumbSmall');

  return (
    <Container onClick={handleClick}>
      <div>
        <StyledAvatar src={avatar} alt={profile.displayname} size="default" />
        <Space width={10} />
        <section>
          {/*!profile.verified ? (
            <strong>{profile.name}</strong>
          ) : (
            <div>
              <strong>{profile.name}</strong>
              <img src={verified} alt="verified" />
            </div>
          )*/}
          <strong>{profile.displayname}</strong>
          <span>{profile.username}</span>
        </section>
      </div>
      <Button following={false} />
    </Container>
  );
};

export default Option;
