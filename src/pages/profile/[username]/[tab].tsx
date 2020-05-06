import React, { useMemo, useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';

import { withAuthSync } from '../../../auth/WithAuthSync';
import { withApollo } from '../../../apollo/Apollo';

import { Template, ProfileThoughts, Me, Profile, Loading } from '../../../ui';
import { labels } from '../../../ui/layout';
import { useS3PostsImages } from '../../../hooks';

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

const GET_POSTS = graphql`
  query posts($accountname: String!, $pathBuilder: any) {
    posts(accountname: $accountname) @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      imagehashes
    }
  }
`;

interface Props {
  me: string;
  userData: any;
  myProfile?: any;
}

const ProfileWrapper: NextPage<Props> = ({ me, userData, myProfile }) => {
  const router = useRouter();
  const imgRef = useRef();
  const { username, tab } = router.query;

  const cookies = cookie.get();

  const isMe = useMemo(() => {
    const meUsername = cookies[KARMA_AUTHOR];
    return username === meUsername;
  }, [cookies, username]);

  const [page, setPage] = useState(1);

  const { data, fetchMore, loading } = useQuery(GET_POSTS, {
    variables: {
      accountname: username,
      pathBuilder: () => `posts/account/${username}?Page=1&Limit=12&domainID=${1}`,
    },
  });

  const loadMorePosts = useCallback(() => {
    fetchMore({
      variables: {
        pathBuilder: () => `posts/account/${username}?Page=${page + 1}&Limit=12&domainId=${1}`,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.posts.length == 0) {
          return Object.assign({}, previousResult, {
            posts: [
              ...previousResult.posts,
              { ...previousResult.posts[previousResult.posts.length - 1], post_id: '', imagehashes: [] },
            ],
          });
        }

        setPage(page + 1);
        return Object.assign({}, previousResult, {
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        });
      },
    });
  }, [username, fetchMore, page]);

  if (!data && loading) return <Loading withContainer size="big" />;

  const medias = useS3PostsImages(data ? data.posts : [], 'thumbBig');

  const tabs = [
    {
      name: 'Media',
      render: () => Template({ medias: medias, loadMore: loadMorePosts, renderedRef: imgRef }),
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
          ...myProfile,
          followers: userData.profile.followers,
          following: userData.profile.following,
          followers_count: userData.profile.followers_count,
          following_count: userData.profile.following_count,
        }}
        postCount={userData.posts.length}
      />
    );

  return (
    <Profile
      tabs={tabs}
      tab={tab as string}
      profile={userData && userData.profile}
      postCount={userData.posts.length}
      myProfile={myProfile}
      me={me}
    />
  );
};

interface Context extends NextPageContext {
  query: {
    tab: string;
    username: string;
  };
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

ProfileWrapper.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);
  const me = cookies[encodeURIComponent(KARMA_AUTHOR)];

  validateTab(ctx, me ? `/profile/${me}/media` : '/home', ['media', 'thoughts']);

  const username = ctx.query.username;
  const { data } = await ctx.apolloClient.query({
    query: GET_PROFILE,
    variables: {
      accountname: ctx.query.username,
      me,
      profilePath: () => `profile/${username}?domainID=${1}`,
      postsPath: () => `posts/account/${username}?domainID=${1}`,
      followersPath: () => `profile/${username}/followers/`,
      followingPath: () => `profile/${username}/following/`,
    },
  });

  return {
    meta: {
      title: `Karma/${ctx.query.username}`,
    },
    me,
    layoutConfig: { layout: labels.DEFAULT, shouldHideHeader: true },
    userData: data,
  };
};

const mapStateToProps = state => ({
  myProfile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(ProfileWrapper)));
