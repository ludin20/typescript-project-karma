import React, { useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import graphql from 'graphql-tag';

import { withAuthSync } from '../auth/WithAuthSync';
import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';

import { Title, PostCard, Space, InfinityScroll } from '../ui';
import { labels } from '../ui/layout';

const GET_POSTS = graphql`
  query posts($accountname: String!, $page: Int, $pathBuilder: any, $postsStatus: String) {
    posts(accountname: $accountname, page: $page, postsStatus: $postsStatus)
      @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      author
      author_displayname
      author_profilehash
      description
      voteStatus(accountname: $accountname)
      created_at
      last_edited_at
      imagehashes
      videohashes
      category_ids
      upvote_count
      downvote_count
      comment_count
      tip_count
      view_count
      username
    }
  }
`;

interface Props {
  author: string;
}

const Home: NextPage<Props> = ({ author }) => {
  const [page, setPage] = useState(1);

  const { data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      accountname: author,
      page: 1,
      postsStatus: 'home',
      pathBuilder: () => `posts/popularv3?Page=1&Limit=10&domainId=${1}`,
    },
  });

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        page: page + 1,
        pathBuilder: () => `posts/popularv3?Page=${page + 1}&Limit=10&domainId=${1}`,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
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

      <Space height={20} />
      {data ? (
        <InfinityScroll length={data.posts.length} loadMore={loadMorePosts}>
          {data.posts.map((post, index) => (
            <PostCard key={String(index)} post={post} withFollowButton={false} />
          ))}
        </InfinityScroll>
      ) : (
        <div />
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
