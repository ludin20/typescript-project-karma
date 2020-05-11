import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Avatar from '../../common/Avatar';
import FollowButton from '../../common/FollowButton';
import Space from '../../common/Space';

import { useS3Image } from '../../../hooks';

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
      margin-bottom: 5px;
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

const Clickable = styled.div`
  cursor: pointer;
`;

interface Props {
  children: React.ReactChild;
}

const WhoToFollowCard: React.FC<Props> = ({ author, displayname, username, hash, isFollowing, online }: any) => {
  const router = useRouter();
  const avatar = useS3Image(hash, 'thumbSmall');

  return (
    <Container key={author}>
      <Clickable
        onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
      >
        <Avatar online={online} src={avatar} alt={name} size="small" />
        <Space width={10} />
        <section>
          <strong>{displayname}</strong>
          <span>{username}</span>
        </section>
      </Clickable>

      <FollowButton author={author} following={isFollowing} />
    </Container>
  );
};

export default WhoToFollowCard;
