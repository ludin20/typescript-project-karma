import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ProfileHeader, ProfileInfo, EditProfileModal, Tabs } from '../../ui';
import { TabInterface } from '../tabs/Tabs';
import { useS3Image } from '../../hooks';

import { updateProfileSuccess } from '../../store/ducks/user';

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
    followers: [];
    following: [];
    followers_count: number;
    following_count: number;
    username: string;
    url: string;
    wax: number;
    eos: number;
    liquidBalance: number;
    currentPower: number;
  };
  followersData: Follow[];
  followingData: Follow[];
  postCount: string | number;
  usernametakenState: boolean;
}

const Me: React.FC<Props> = ({ tabs, tab, profile, followersData, followingData, postCount, usernametakenState }) => {
  const {
    displayname,
    bio,
    hash,
    author,
    following,
    followers_count,
    following_count,
    username,
    url,
    wax,
    eos,
    liquidBalance,
    currentPower,
  } = profile;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const avatar = useS3Image(hash, 'thumbBig');
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (usernametakenState) setModalIsOpen(true);
    else setModalIsOpen(false);
  }, [usernametakenState]);

  const handleFollow = (author: string, follow: boolean) => {
    if (follow) {
      const data = {
        following: [...following, author],
        following_count: following_count + 1,
      };
      dispatch(updateProfileSuccess(data));
    } else {
      const data = {
        following: following.filter(item => item != author),
        following_count: following_count - 1,
      };
      dispatch(updateProfileSuccess(data));
    }
  };

  return (
    <Wrapper>
      <ProfileHeader
        avatar={avatar}
        posts={postCount}
        followersCount={followers_count}
        followingCount={following_count}
        followers={followersData}
        following={followingData}
        onFollow={handleFollow}
      />

      <ProfileInfo
        avatar={avatar as string}
        name={displayname}
        username={username}
        author={author}
        me
        wax={wax}
        eos={eos}
        liquidBalance={Math.floor(liquidBalance)}
        currentPower={currentPower}
        url={url}
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
          profile={{ author, bio, displayname, hash, username, url }}
        />
      )}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  usernametakenState: state.user.usernametaken,
});

export default connect(mapStateToProps)(Me);
