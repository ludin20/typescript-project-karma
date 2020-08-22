import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import graphql from 'graphql-tag';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { useRouter } from 'next/router';

import { Title, PostCard, PostComments, GoBackButton, Space } from '../../../../ui';
import { labels } from '../../../../ui/layout';

import { RootState } from '../../../../store/ducks/rootReducer';
import { withApollo } from '../../../../apollo/Apollo';
import { PostInterface } from '../../../../ui/post/PostCard';


const Wrapper = styled.div`
  @media (max-width: 700px) {
    padding: 30px 15px 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 20px 0 0;
  }

  @media (max-width: 700px) {
    button + div {
      display: none;
    }
  }
`;

const GET_POST = graphql`
  query post($post_id: Int!, $accountname: String) {
    post(post_id: $post_id, accountname: $accountname) @rest(type: "Post", path: "post/{args.post_id}") {
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
    comments(post_id: $post_id) @rest(type: "Comment", path: "comments/post/{args.post_id}") {
      cmmt_id
      text
      post_id
      author_profilehash
      author
      username
      created_at
    }
  }
`;

interface Props {
  post: PostInterface;
  comments: any[];
  author: string;
}

const Post1: NextPage<Props> = ({ post, comments, author }) => {
  const [postData, setPostData] = useState(post);
  const [commentsData, setCommentsData] = useState(comments);
  // eslint-disable-next-line prettier/prettier
  const { wax, eos, liquidBalance, upvoted, hash, username } = useSelector((state: RootState) => state.user.profile);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onCommentAdded = (text: string) => {
    const createdDate = new Date();
    commentsData.unshift({
      author: author,
      author_profilehash: hash,
      cmmt_id: createdDate.getTime() / 1000,
      created_at: createdDate.toISOString(),
      post_id: router.query.id,
      text: text,
      username: username,
    });
    setCommentsData([...commentsData]);
  };

  return (
    <Wrapper>

      <PostCard
        post={postData}
        wax={wax}
        eos={eos}
        liquidBalance={Math.floor(liquidBalance)}
        upvoted={upvoted}
        shouldHideFollowOnMobile
        withFollowButton={false}
        isDetails={true}
        onCommentAdded={onCommentAdded}
      />

      <PostComments comments={commentsData} />
    </Wrapper>
  );
};

interface Context extends NextPageContext {
  query: {
    id: string;
  };
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

Post1.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);
  const author = ctx.query.author;
  const { data } = await ctx.apolloClient.query({
    query: GET_POST,
    variables: {
      post_id: ctx.query.id,
      accountname: author,
    },
  });

  return {
    post: data.post,
    comments: data.comments,
    author: author,
    meta: {
      title: `${data.post.author} on Karma "${data.post.description}"`,
      description: data.post.description,
    },
    layoutConfig: {
      layout: labels.COPYPOST,
      shouldHideHeader: true,
    },
  };
};

export default withApollo({ ssr: true })(Post1);
