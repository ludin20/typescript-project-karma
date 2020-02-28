import React from 'react';

import { profile } from '../../mock';

import { ProfileHeader, ProfileInfo, Tabs, GoBackButton } from '../../ui';
import { TabInterface } from '../../ui/Tabs/Tabs';

import Layout from '../layout/Layout';

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
    <Layout>
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
    </Layout>
  );
};

export default Profile;
