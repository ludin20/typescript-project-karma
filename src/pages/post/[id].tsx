import React from 'react';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Title, PostCard, GoBackButton } from '../../ui';
import PostComments from '../../ui/post/PostComments';

import { RootState } from '../../store/modules/rootReducer';

import { post as mockPost } from '../../mock';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin: 0 20px 0 0;
  }
`;

interface Props {
  post: {
    commentsContent: {
      id: number;
      author: {
        avatar: string;
        username: string;
      };
      time: string;
      content: string;
    }[];
    comments: number;
    id: number;
    date: string;
    likes: number;
    recycles: number;
    tips: number;
    power: string;
    content: {
      description: string;
      hashtags: string[];
      medias: string[];
    };
    author: {
      avatar: string;
      name: string;
      username: string;
      following: boolean;
    };
  };
}

const Post: NextPage<Props> = ({ post }) => {
  const { avatar } = useSelector((state: RootState) => state.user.profile);

  return (
    <>
      <TitleWrapper>
        <GoBackButton />
        <Title bordered={false}>Post</Title>
      </TitleWrapper>

      <PostCard post={post} />

      <PostComments comments={post.commentsContent} avatar={avatar as string} />
    </>
  );
};

interface Context extends NextPageContext {
  query: {
    id?: string;
  };
}

Post.getInitialProps = async ({ query }: Context) => {
  const post = { ...mockPost, commentsContent: mockPost.comments, comments: mockPost.comments.length };

  return {
    post,
    meta: {
      title: `${post.author.username} on Karma "${post.content.description}"`,
      description: post.content.description,
    },
  };
};

export default Post;
