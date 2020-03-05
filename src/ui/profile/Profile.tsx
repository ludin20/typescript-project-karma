import React from 'react';

import styled from 'styled-components';

import { profile } from '../../mock';

import { ProfileHeader, ProfileInfo, Tabs, GoBackButton } from '../../ui';
import { TabInterface } from '../tabs/Tabs';

const Wrapper = styled.div`
  @media (max-width: 700px) {
    padding: 30px 15px 0;

    left: 0;
  }
`;

interface Props {
  tabs: TabInterface[];
  tab: string;
}

const Profile: React.FC<Props> = ({ tabs, tab }) => {
  const {
    avatar,
    posts: PostCount,
    followers,
    following,
    name,
    isVerified,
    power,
    bio,
    website,
    isFollowing,
    followsMe,
  } = profile;

  return (
    <Wrapper>
      <GoBackButton />
      <ProfileHeader avatar={avatar} posts={PostCount} followers={followers} following={following} />

      <ProfileInfo
        avatar={avatar}
        name={name}
        username={profile.username}
        isVerified={isVerified}
        power={power}
        website={website}
        bio={bio}
        following={isFollowing}
        followsMe={followsMe}
      />

      <Tabs tabs={tabs} paramTab={tab || ''} size="big" />
    </Wrapper>
  );
};

export default Profile;
