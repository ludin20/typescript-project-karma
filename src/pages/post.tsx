import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Title, PostCard } from '../ui';
import { post } from '../mock';

import Layout from '../modules/layout/Layout';
import { RootState } from '../store/modules/rootReducer';
import PostComments from '../modules/post/PostComments';

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Container = styled(Layout)`
  list-style: none;
`;

const Post: React.FC = () => {
  const { avatar } = useSelector((state: RootState) => state.user.profile);

  return (
    <Container>
      <TitleWrapper>
        <Title bordered={false}>Post</Title>
      </TitleWrapper>

      <PostCard
        id={post.id}
        date={post.date}
        likes={post.likes}
        comments={post.comments.length}
        recycles={post.recycles}
        tips={post.tips}
        power={post.power}
        content={post.content}
        author={post.author}
      />

      <PostComments comments={post.comments} avatar={avatar} />
    </Container>
  );
};

export default Post;
