import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { ProfileHeader, ProfileInfo, EditProfileModal, Tabs, Layout } from '../../ui';
import { TabInterface } from '../tabs/Tabs';

import { RootState } from '../../store/modules/rootReducer';

interface Props {
  tabs: TabInterface[];
  tab: string;
}

const Me: React.FC<Props> = ({ tabs, tab }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const profile = useSelector((state: RootState) => state.user.profile);

  const { avatar, posts: PostCount, followers, following, name, isVerified, power, bio, website } = profile;

  return (
    <Layout>
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

      {modalIsOpen && <EditProfileModal open close={() => setModalIsOpen(false)} />}
    </Layout>
  );
};

export default Me;
