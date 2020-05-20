import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import graphql from 'graphql-tag';
import styled from 'styled-components';

import { withAuthSync } from '../../auth/WithAuthSync';
import { withApollo } from '../../apollo/Apollo';

import { PostCard, Space, InfinityScroll, GoBackButton } from '../../ui';
import { labels } from '../../ui/layout';

import { RootState } from '../../store/ducks/rootReducer';

const GET_POSTS = graphql`
  query posts($hashtag: String!) {
    posts(hashtag: $hashtag) @rest(type: "Post", path: "posts/hastag/{args.hashtag}") {
      author
      post_id
      author_displayname
      author_profilehash
      imagehashes
      videohashes
      created_at
      description
      upvote_count
      downvote_count
      comment_count
      tip_count
      video_count
      username
    }
  }
`;

interface TitleProps {
  green?: boolean;
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 20px 0 0;
  }

  @media (max-width: 350px) {
    button + div {
      display: none;
    }
  }
`;

const Title = styled.p<TitleProps>`
  color: ${props => (props.green ? props.theme.green : '#fff')};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
`;

interface Props {
  data: any[];
  hashtag: string;
}

const Hashtag: NextPage<Props> = ({ data, hashtag }) => {
  const [posts, setPosts] = useState(data);
  const [upvoted, setUpvoted] = useState(JSON.parse(localStorage.getItem('upvoted')));
  const { wax, eos, liquidBalance } = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    setPosts(data);
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div>
      <TitleWrapper>
        <GoBackButton />
        <Title green>#{hashtag}</Title>
      </TitleWrapper>
      <>
        <Space height={20} />
        {posts ? (
          <InfinityScroll length={posts.length}>
            {posts.map((post, index) => (
              <React.Fragment key={String(index)}>
                {index > 0 && <Space height={40} />}
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
    </div>
  );
};

interface Context extends NextPageContext {
  query: {
    id: string;
  };
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

Hashtag.getInitialProps = async (ctx: Context) => {
  const hashtag = ctx.query.id;
  const { data } = await ctx.apolloClient.query({
    query: GET_POSTS,
    variables: {
      hashtag: `%23${hashtag}`,
    },
  });
  return {
    layoutConfig: { layout: labels.DEFAULT },
    meta: {
      title: `Karma/Hashtag`,
    },
    data: data.posts,
    hashtag,
  };
};

export default withAuthSync(withApollo({ ssr: true })(Hashtag));
