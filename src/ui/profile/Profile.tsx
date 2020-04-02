import React from 'react';

import styled from 'styled-components';

import { ProfileHeader, ProfileInfo, Tabs, GoBackButton } from '../../ui';
import { TabInterface } from '../tabs/Tabs';
import { useS3Image } from '../../hooks';

const Wrapper = styled.div`
  @media (max-width: 700px) {
    padding: 30px 15px 0;

    left: 0;
  }
`;

interface Props {
  tabs: TabInterface[];
  tab: string;
  profile: {
    displayname: string;
    author: string;
    bio: string;
    hash: string;
    followers_count: string;
    following_count: string;
    username: string;
    followers: string[];
    following: string[];
  };
  postCount: string;
  me: string;
}

const Profile: React.FC<Props> = ({ tabs, tab, profile, postCount, me }) => {
  const { displayname, bio, hash, followers_count, following_count, followers, following, username } = profile;
  const avatar = useS3Image(hash, 'thumbBig');

  const isFollowing = !!followers.find(accountName => accountName === me);
  const followsMe = !!following.find(accountName => accountName === me);

  return (
    <Wrapper>
      <GoBackButton />
      <ProfileHeader avatar={avatar} posts={postCount} followers={followers_count} following={following_count} />

      <ProfileInfo
        avatar={avatar}
        name={displayname}
        username={username}
        power="0"
        website=""
        bio={bio}
        following={isFollowing}
        followsMe={followsMe}
      />

      <Tabs tabs={tabs} paramTab={tab || ''} size="big" />
    </Wrapper>
  );
};

export default Profile;
