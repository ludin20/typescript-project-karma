import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { ProfileHeader, ProfileInfo, Tabs, GoBackButton } from '../../ui';
import { TabInterface } from '../tabs/Tabs';
import { useS3Image } from '../../hooks';
import karmaApi from '../../services/api';

const Wrapper = styled.div`
  @media (max-width: 700px) {
    padding: 30px 15px 0;

    left: 0;
  }
`;

interface Follow {
  author: string;
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
    followers_count: string;
    following_count: string;
    username: string;
    followers: Follow[];
    following: Follow[];
  };
  postCount: string;
  me: string;
}

const Profile: React.FC<Props> = ({ tabs, tab, profile, postCount, me }) => {
  const { displayname, bio, hash, followers, following, followers_count, following_count, username, author } = profile;
  const avatar = useS3Image(hash, 'thumbBig');
  const [followersCount, setFollowersCount] = useState(parseInt(followers_count));
  const [isFollowing, setIsFollowing] = useState(false);
  const [followsMe, setFollowsMe] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await karmaApi.get(`profile/${author}?domainID=1`);
      if (response && response.data) {
        setIsFollowing(!!response.data.followers.find(follow => follow === me));
        setFollowsMe(!!response.data.following.find(follow => follow === me));
      }
    }

    fetchData();
  }, [author, me]);

  const onSuccessFollow = (following: boolean) => {
    following ? setFollowersCount(followersCount + 1) : setFollowersCount(followersCount - 1);
  };

  return (
    <Wrapper>
      <GoBackButton />
      <ProfileHeader
        avatar={avatar}
        posts={postCount}
        followersCount={followersCount}
        followingCount={following_count}
        followers={followers}
        following={following}
      />

      <ProfileInfo
        avatar={avatar}
        name={displayname}
        username={username}
        author={author}
        power="0"
        website=""
        bio={bio}
        following={isFollowing}
        followsMe={followsMe}
        onFollowSuccess={onSuccessFollow}
      />

      <Tabs tabs={tabs} paramTab={tab || ''} size="big" />
    </Wrapper>
  );
};

export default Profile;
