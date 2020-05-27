import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import graphql from 'graphql-tag';

import { follow } from 'src/services/config';
import { withAuthSync } from '../auth/WithAuthSync';
import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';

import { Title, PostCard, Space, InfinityScroll, Loading } from '../ui';
import { labels } from '../ui/layout';

import { RootState } from '../store/ducks/rootReducer';
import { hasMoreTrue, hasMoreFalse } from '../store/ducks/action';

const GET_POSTS = graphql`
  query posts($accountname: String!, $upvoted: Array, $page: Int, $pathBuilder: any, $postsStatus: String) {
    posts(accountname: $accountname, page: $page, postsStatus: $postsStatus)
      @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      author
      author_displayname
      author_profilehash
      description
      voteStatus(upvoted: $upvoted) @client
      created_at
      last_edited_at
      imagehashes
      videohashes
      category_ids
      upvote_count
      downvote_count
      comment_count
      tip_count
      video_count
      username
    }
  }
`;

interface Props {
  author: string;
}

const Home: NextPage<Props> = ({ author }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [upvoted, setUpvoted] = useState(JSON.parse(localStorage.getItem('upvoted')));
  const { wax, eos, liquidBalance, following } = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();

  const { fetchMore, loading } = useQuery(GET_POSTS, {
    variables: {
      accountname: author,
      upvoted: upvoted,
      page: 1,
      postsStatus: 'home',
      pathBuilder: () =>
        following.length >= 1
          ? `posts/home/${author}?Page=${page}&Limit=12&domainId=${1}`
          : `posts/popularv3?Page=${page}&Limit=15&domainId=${1}`,
    },
    onCompleted: data => {
      const results = data.posts.filter((post, idx) => data.posts.indexOf(post) == idx);
      setPosts(results);
    },
  });

  const loadMorePosts = () => {
    const params = `?Page=${page + 1}&Limit=15&domainId=${1}`;
    if (!fetchMore) return;
    fetchMore({
      variables: {
        page: page + 1,
        pathBuilder: () =>
          following.length >= 1
            ? `posts/home/${author}?Page=${page + 1}&Limit=12&domainId=${1}`
            : `posts/popularv3${params}`,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          dispatch(hasMoreFalse());
          return previousResult;
        }
        if (following.length >= 1) {
          if (fetchMoreResult.posts.length < 12) dispatch(hasMoreFalse());
          else dispatch(hasMoreTrue());
        } else {
          if (fetchMoreResult.posts.length < 15) dispatch(hasMoreFalse());
          else dispatch(hasMoreTrue());
        }
        setPage(page + 1);
        return Object.assign({}, previousResult, {
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        });
      },
    });
  };

  return (
    <div>
      <Title withDropDown>Feed</Title>

      {loading ? (
        <Loading withContainer size="big" />
      ) : (
        <>
          <Space height={20} />
          {posts ? (
            <InfinityScroll length={posts.length} loadMore={loadMorePosts}>
              {posts.map((post, index) => (
                <React.Fragment key={String(index)}>
                  {index > 0 && <Space height={30} />}
                  <PostCard
                    post={post}
                    wax={wax}
                    eos={eos}
                    liquidBalance={Math.floor(liquidBalance)}
                    upvoted={upvoted}
                    withFollowButton={false}
                    isDetails={false}
                  />
                </React.Fragment>
              ))}
            </InfinityScroll>
          ) : (
            <div />
          )}
        </>
      )}
    </div>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

Home.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  ctx.apolloClient.writeData({
    data: {
      accountName: author,
    },
  });

  return {
    layoutConfig: { layout: labels.DEFAULT },
    meta: {
      title: 'Karma/Feed',
    },
    author,
  };
};

export default withAuthSync(withApollo({ ssr: true })(Home));
