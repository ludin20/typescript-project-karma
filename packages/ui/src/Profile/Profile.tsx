import React, { useState } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';

import UpdateProfile from '../UpdateProfile';

import Tabs from '../Tabs';

import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileMedia from './ProfileMedia';
import ProfileThoughts from './ProfileThoughts';

const Container = styled.div``;

interface ProfileProps {
  avatar: string;
  name: string;
  username: string;
  bio: string;
  website: string;
  followers: string | number;
  power: string | number;
  following: string | number;
  posts: string | number;
  isVerified: boolean;
}

interface Props {
  profile: ProfileProps;
  posts: [];
  formik: FormikProps<any>;
}

const ProfileContainer: React.FC<Props> = ({ profile, posts, formik }) => {
  const { avatar, posts: PostCount, followers, following, name, username, isVerified, power, bio, website } = profile;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const tabs = [
    {
      name: 'Media',
      render: () => ProfileMedia({ posts: posts.filter((post: any) => post.type === 'media' && post) }),
    },
    {
      name: 'Thoughts',
      render: () => ProfileThoughts({ profile, posts: posts.filter((post: any) => post.type === 'thought' && post) }),
    },
    /*  {
      name: 'Articles',
      render: () => ProfileMedia({ posts }),
    }, */
  ];

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
      <Tabs tabs={tabs} />
    </Container>
  );
};

export default ProfileContainer;
