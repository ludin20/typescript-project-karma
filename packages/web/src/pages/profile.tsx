import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ProfileContainer } from '@karma/ui';
import { posts } from '@karma/mock';

import Layout from '../modules/layout/Layout';
import { ProfileProps, updateProfileRequest } from '../store/modules/user/actions';
import { RootState } from '../store/modules/rootReducer';

const Profile: React.FC = () => {
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
      return dispatch(updateProfileRequest(values));
    },
  });

  return (
    <Layout>
      <ProfileContainer posts={posts} profile={profile} formik={formik} />
    </Layout>
  );
};

export default Profile;
