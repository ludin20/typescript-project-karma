import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { followers as followersArray, following as followingArray } from '../../mock';
import Avatar from '../common/Avatar';
import FollowsModal from '../common/FollowsModal';

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
      margin-left: 50px;

      display: flex;
      flex-direction: column;
      align-items: center;

      strong {
        font-size: 36px;
        font-weight: 900;
      }

      span {
        font-size: 26px;
      }
    }
  }

  @media (max-width: 860px) {
    > section {
      margin-left: 50px;
      flex: 1;
      display: flex;
      justify-content: space-between;

      button,
      p {
        margin-left: 0;

        strong {
          font-size: 30px;
        }

        span {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    section {
      margin-left: 30px;
    }

    p > strong,
    button > strong {
      font-size: 20px !important;
    }

    p > span,
    button > span {
      font-size: 14px !important;
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
      <Avatar size="big" src={avatar as string} alt="avatar" />

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
