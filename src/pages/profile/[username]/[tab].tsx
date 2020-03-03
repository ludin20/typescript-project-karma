import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { ProfileMedia, ProfileThoughts, Me, Profile, Seo } from '../../../ui';

import { posts, quezPosts } from '../../../mock';

import { RootState } from '../../../store/modules/rootReducer';

interface Props {
  tab: string;
}

const ProfileWrapper: React.FC<Props> = () => {
  const profile = useSelector((state: RootState) => state.user.profile);

  const router = useRouter();
  const { username, tab } = router.query;

  const me = useMemo(() => {
    const meUsername = profile.username.split('@')[1];
    return username === meUsername;
  }, [profile.username, username]);

  const mockPosts = useMemo(() => {
    if (me) return posts;

    return quezPosts;
  }, [me]);

  const tabs = [
    {
      name: 'Media',
      render: () => ProfileMedia({ posts: mockPosts.filter((post: any) => post.type === 'media' && post) }),
    },
    {
      name: 'Thoughts',
      render: () =>
        ProfileThoughts({ profile, posts: mockPosts.filter((post: any) => post.type === 'thought' && post) }),
    },
  ];

  useEffect(() => {
    const href = '/profile/[username]/[tab]';
    const as = `/profile/${username}/media`;

    if (username && !tab) {
      router.push(href, as, { shallow: true });
      return;
    }

    if (username && tab) {
      const isValidTab = tabs.find(t => t.name.toLocaleLowerCase() === tab);

      if (!isValidTab) router.push(href, as, { shallow: true });
    }
  }, [router, tab, tabs, username]);

  if (me)
    return (
      <>
        <Seo title={`Karma/${username}`} />
        <Me tabs={tabs} tab={tab as string} />
      </>
    );

  return (
    <>
      <Seo title={`Karma/${username}`} />
      <Profile tabs={tabs} tab={tab as string} />
    </>
  );
};

export default ProfileWrapper;
