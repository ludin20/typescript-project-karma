import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ProfileHeader, ProfileInfo, EditProfileModal, Tabs } from '../../ui';
import { TabInterface } from '../tabs/Tabs';

import { RootState } from '../../store/ducks/rootReducer';

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

const Me: React.FC<Props> = ({ tabs, tab }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const profile = useSelector((state: RootState) => state.user.profile);

  const { avatar, posts: PostCount, followers, following, name, isVerified, power, bio, website } = profile;

  return (
    <Wrapper>
      <ProfileHeader avatar={avatar} posts={PostCount} followers={followers} following={following} />

      <ProfileInfo
        avatar={avatar as string}
        name={name}
        username={profile.username}
        me
        isVerified={isVerified}
        power={power}
        website={website}
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
        />
      )}
    </Wrapper>
  );
};

export default Me;
