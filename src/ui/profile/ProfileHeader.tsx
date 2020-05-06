import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import Avatar from '../common/Avatar';
import FollowsModal from '../common/FollowsModal';
import ShimmerImage from '../common/ShimmerImage';

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

interface Follow {
  username: string;
  hash: string;
  displayname: string;
}

interface Props {
  avatar: string | File;
  posts: string | number;
  followers: Follow[];
  following: Follow[];
  followersCount: string | number;
  followingCount: string | number;
  onFollow?(author: string, follow: boolean): void;
}

const ProfileHeader: React.FC<Props> = ({
  avatar,
  posts,
  followers,
  following,
  followersCount,
  followingCount,
  onFollow,
  ...props
}) => {
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

  const data = useMemo(() => (followersModalIsOpen ? followers : following), [
    followersModalIsOpen,
    followers,
    following,
  ]);

  const title = useMemo(() => (followersModalIsOpen ? 'Followers' : 'Following'), [followersModalIsOpen]);

  return (
    <Container {...props}>
      <ShimmerImage width={120} height={120} avatar src={avatar as string} alt="avatar" circle size="big" />

      <section>
        <p>
          <strong>{posts}</strong>
          <span>Posts</span>
        </p>

        <button onClick={() => handleOpenModal('followers')}>
          <strong>{followersCount}</strong>
          <span>Followers</span>
        </button>

        <button onClick={() => handleOpenModal('following')}>
          <strong>{followingCount}</strong>
          <span>Following</span>
        </button>
      </section>

      {(followersModalIsOpen || followingModalIsOpen) && (
        <FollowsModal data={data} open close={handleCloseModal} title={title} onFollow={onFollow} />
      )}
    </Container>
  );
};

export default ProfileHeader;
