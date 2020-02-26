import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import Avatar from '../Avatar';
import FollowsModal from '../FollowsModal';

import { followers as followersArray, following as followingArray } from '../../mock';

const Container = styled.div`
  display: flex;
  align-items: center;

  > section {
    display: flex;
    flex-direction: row;

    button,
    p {
      background: none;
      color: #fff;
      margin-left: 60px;

      display: flex;
      flex-direction: column;
      align-items: center;

      strong {
        font-size: 25px;
        font-weight: 900;
      }

      span {
        font-size: 18px;
      }
    }
  }
`;

interface Props {
  avatar: string | File;
  posts: string | number;
  followers: string | number;
  following: string | number;
}

const ProfileHeader: React.FC<Props> = ({ avatar, posts, followers, following, ...props }) => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

  const handleOpenModal = useCallback((type: 'followers' | 'following') => {
    if (type === 'followers') {
      setFollowingModalIsOpen(false);
      setFollowersModalIsOpen(true);
    } else {
      setFollowersModalIsOpen(false);
      setFollowingModalIsOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setFollowersModalIsOpen(false);
    setFollowingModalIsOpen(false);
  }, []);

  const data = useMemo(() => {
    if (followersModalIsOpen) {
      return followersArray;
    } else if (followingModalIsOpen) {
      return followingArray;
    }

    return [];
  }, [followersModalIsOpen, followingModalIsOpen]);

  const title = useMemo(() => {
    if (followersModalIsOpen) {
      return 'Followers';
    } else {
      return 'Following';
    }
  }, [followersModalIsOpen]);

  return (
    <Container {...props}>
      <Avatar size="big" path={avatar as string} online={false} alt="avatar" />

      <section>
        <p>
          <strong>{posts}</strong>
          <span>Posts</span>
        </p>

        <button onClick={() => handleOpenModal('followers')}>
          <strong>{followers}</strong>
          <span>Followers</span>
        </button>

        <button onClick={() => handleOpenModal('following')}>
          <strong>{following}</strong>
          <span>Following</span>
        </button>
      </section>

      <FollowsModal
        data={data}
        open={followersModalIsOpen || followingModalIsOpen}
        close={handleCloseModal}
        title={title}
      />
    </Container>
  );
};

export default ProfileHeader;