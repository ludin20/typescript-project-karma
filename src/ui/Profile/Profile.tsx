import React, { useState } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';

import UpdateProfile from '../UpdateProfile';

import Tabs from '../Tabs';

import { ProfileProps } from '../../store/modules/user/actions';

import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

const Container = styled.div``;

interface Props {
  profile: ProfileProps;
  posts: any[];
  formik: FormikProps<any>;
  tabs: any[];
  tab: string;
}

const ProfileContainer: React.FC<Props> = ({ profile, tabs, formik, tab }) => {
  const { avatar, posts: PostCount, followers, following, name, username, isVerified, power, bio, website } = profile;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Container>
      <ProfileHeader avatar={avatar} posts={PostCount} followers={followers} following={following} />

      <ProfileInfo
        name={name}
        username={username}
        isVerified={isVerified}
        power={power}
        website={website}
        bio={bio}
        handleModal={() => setModalIsOpen(true)}
      />

      <UpdateProfile formik={formik} open={modalIsOpen} close={() => setModalIsOpen(false)} />
      <Tabs tabs={tabs} paramTab={tab || ''} />
    </Container>
  );
};

export default ProfileContainer;
