import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ProfileHeader, ProfileInfo, UpdateProfile, Tabs } from '../../ui';
import { TabInterface } from '../../ui/Tabs/Tabs';

import { RootState } from '../../store/modules/rootReducer';
import { ProfileProps, updateProfileRequest } from '../../store/modules/user/actions';

import Layout from '../layout/Layout';

interface Props {
  tabs: TabInterface[];
  tab: string;
}

const Me: React.FC<Props> = ({ tabs, tab }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      avatar: profile.avatar || '',
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      website: profile.website,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      bio: Yup.string(),
      website: Yup.string(),
    }),
    validateOnMount: true,
    onSubmit: (values: ProfileProps) => {
      dispatch(updateProfileRequest(values));
    },
  });

  const { avatar, posts: PostCount, followers, following, name, isVerified, power, bio, website } = profile;

  return (
    <Layout>
      <ProfileHeader avatar={avatar} posts={PostCount} followers={followers} following={following} />

      <ProfileInfo
        name={name}
        username={profile.username}
        me
        isVerified={isVerified}
        power={power}
        website={website}
        bio={bio}
        handleModal={() => setModalIsOpen(true)}
      />

      <UpdateProfile formik={formik} open={modalIsOpen} close={() => setModalIsOpen(false)} />

      <Tabs tabs={tabs} paramTab={tab || ''} />
    </Layout>
  );
};

export default Me;
