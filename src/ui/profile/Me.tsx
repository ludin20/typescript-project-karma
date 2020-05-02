import React, { useState } from 'react';
import styled from 'styled-components';

import { ProfileHeader, ProfileInfo, EditProfileModal, Tabs } from '../../ui';
import { TabInterface } from '../tabs/Tabs';
import { useS3Image } from '../../hooks';

const Wrapper = styled.div`
  @media (max-width: 700px) {
    padding: 30px 15px 0;

    left: 0;
  }
`;

interface Follow {
  username: string;
  hash: string;
  displayname: string;
}

interface Props {
  tabs: TabInterface[];
  tab: string;
  profile: {
    displayname: string;
    author: string;
    bio: string;
    hash: string;
    followers: Follow[];
    following: Follow[];
    followers_count: string;
    following_count: string;
    username: string;
  };
  postCount: string;
}

const Me: React.FC<Props> = ({ tabs, tab, profile, postCount }) => {
  const { displayname, bio, hash, author, followers, following, followers_count, following_count, username } = profile;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const avatar = useS3Image(hash, 'thumbBig');

  return (
    <Wrapper>
      <ProfileHeader
        avatar={avatar}
        posts={postCount}
        followersCount={followers_count}
        followingCount={following_count}
        followers={followers}
        following={following}
      />

      <ProfileInfo
        avatar={avatar as string}
        name={displayname}
        username={username}
        author={author}
        me
        power={0}
        website=""
        bio={bio}
        handleModal={() => setModalIsOpen(true)}
      />

      <Tabs tabs={tabs} paramTab={tab || ''} size="big" />

      {modalIsOpen && (
        <EditProfileModal
          open
          close={() => {
            setModalIsOpen(false);
          }}
          profile={{ author, bio, displayname, hash, username }}
        />
      )}
    </Wrapper>
  );
};

export default Me;
