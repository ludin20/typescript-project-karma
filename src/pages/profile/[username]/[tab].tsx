import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';

import { withAuthSync } from '../../../auth/WithAuthSync';
import { withApollo } from '../../../apollo/Apollo';

import { ProfileMedia, ProfileThoughts, Me, Profile, Loading } from '../../../ui';
import { labels } from '../../../ui/layout';

import validateTab from '../../../util/validateTab';
import { KARMA_AUTHOR } from '../../../common/config';

const GET_PROFILE = graphql`
  query profile($accountname: String!, $me: String!, $profilePath: any, $postsPath: any, $followersPath: any, $followingPath: any) {
    profile(accountname: $accountname) @rest(type: "Profile", pathBuilder: $profilePath) {
      displayname
      author
      bio
      hash
      followers_count
      following_count
      followers(accountname: $accountname, page: $page) @rest(type: "Followers", pathBuilder: $followersPath) {
        username
        hash
        displayname
        author
      }
      following(accountname: $accountname, page: $page) @rest(type: "Followers", pathBuilder: $followingPath) {
        username
        hash
        displayname
        author
      }
      username
    }
    posts(accountname: $accountname) @rest(type: "Post", pathBuilder: $postsPath) {
      post_id
      imagehashes
    }
  }
`;

interface Props {
  me: string;
  profile: any;
}

const ProfileWrapper: NextPage<Props> = ({ me, profile }) => {
  const router = useRouter();
  const { username, tab } = router.query;

  const cookies = cookie.get();

  const isMe = useMemo(() => {
    const meUsername = cookies[KARMA_AUTHOR];
    return username === meUsername;
  }, [cookies, username]);

  const { data, loading } = useQuery(GET_PROFILE, {
    variables: {
      accountname: username,
      me,
      profilePath: () => `profile/${username}?domainID=${1}`,
      postsPath: () => `posts/account/${username}?domainID=${1}`,
      followersPath: () => `profile/${username}/followers/`,
      followingPath: () => `profile/${username}/following/`,
    },
  });

  if (!data && loading) return <Loading withContainer size="big" />;

  const tabs = [
    {
      name: 'Media',
      render: () => ProfileMedia({ posts: data.posts }),
    },
    /* {
      name: 'Thoughts',
      render: () => ProfileThoughts({ profile: data.profile, posts: data.posts }),
    }, */
  ];

  if (isMe)
    return (
      <Me
        tabs={tabs}
        tab={tab as string}
        profile={{
          ...profile,
          followers: data.profile.followers,
          following: data.profile.following,
          followers_count: data.profile.followers_count,
          following_count: data.profile.following_count,
        }}
        postCount={data.posts.length}
      />
    );

  return <Profile tabs={tabs} tab={tab as string} profile={data.profile} postCount={data.posts.length} me={me} />;
};

interface Context extends NextPageContext {
  query: {
    tab: string;
    username: string;
  };
}

ProfileWrapper.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);
  const me = cookies[encodeURIComponent(KARMA_AUTHOR)];

  validateTab(ctx, me ? `/profile/${me}/media` : '/home', ['media', 'thoughts']);

  return {
    meta: {
      title: `Karma/${ctx.query.username}`,
    },
    me,
    layoutConfig: { layout: labels.DEFAULT, shouldHideHeader: true },
  };
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(ProfileWrapper)));
