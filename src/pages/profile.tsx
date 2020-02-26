import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { ProfileContainer, ProfileMedia, ProfileThoughts } from '../ui';
import { posts } from '../mock';

import Layout from '../modules/layout/Layout';
import { ProfileProps, updateProfileRequest } from '../store/modules/user/actions';
import { RootState } from '../store/modules/rootReducer';

interface Props {
  tab: string;
}

const Profile: NextPage<Props> = ({ tab }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);

  const router = useRouter();

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

  const tabs = [
    {
      name: 'Media',
      render: () => ProfileMedia({ posts: posts.filter((post: any) => post.type === 'media' && post) }),
    },
    {
      name: 'Thoughts',
      render: () => ProfileThoughts({ profile, posts: posts.filter((post: any) => post.type === 'thought' && post) }),
    },
  ];

  useEffect(() => {
    const isTab = tabs.find(t => t.name.toLocaleLowerCase() === tab);

    if (!isTab) {
      router.push('/profile/media', undefined, { shallow: true });
    }
  }, [router, tab, tabs]);

  return (
    <Layout>
      <ProfileContainer tab={tab} posts={posts} profile={profile} formik={formik} tabs={tabs} />
    </Layout>
  );
};

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
}

Profile.getInitialProps = async ({ query }: Context) => {
  return { tab: query.tab };
};

export default Profile;
