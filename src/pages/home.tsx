import React from 'react';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import graphql from 'graphql-tag';

import { withAuthSync } from '../auth/WithAuthSync';
import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';

import { Title, PostCard, Space } from '../ui';
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
  data: any;
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <Title withDropDown>Feed</Title>

      <Space height={20} />
      <ul>
        {data.posts.map((post, index) => (
          <PostCard key={String(index)} post={post} withFollowButton={false} />
        ))}
      </ul>
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

  const { data } = await ctx.apolloClient.query({
    query: GET_POSTS,
    variables: {
      accountname: author,
      page: 1,
      postsStatus: 'home',
      pathBuilder: () => `posts/popularv3?Page=1&Limit=10&domainId=${1}`,
    },
  });

  return {
    layoutConfig: { layout: labels.DEFAULT },
    data,
    meta: {
      title: 'Karma/Feed',
    },
  };
};

export default withAuthSync(withApollo({ ssr: true })(Home));
