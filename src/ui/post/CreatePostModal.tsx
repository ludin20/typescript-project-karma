import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import graphql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';

import { useRouter } from 'next/router';

import closeIcon from '../assets/close.svg';
import Title from '../common/Title';

import ModalWrapper, { ModalProps } from '../common/ModalWrapper';

import ModalForm from './ModalForm';

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.dark};
  padding: 30px 50px;
  border-radius: 20px;
  transform: translateY(50%);

  header {
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: 700px) {
    max-width: unset;
    height: 100vh;
    border-radius: 0;
    padding: 50px 15px;
  }
`;

const CREATE_POST = graphql`
  mutation createPost(
    $post_id: Int
    $description: String
    $lat: String
    $lng: String
    $imagehashes: [String]
    $videohashes: [String]
    $categories: [Int]
  ) {
    createPost(
      post_id: $post_id
      description: $description
      lat: $lat
      lng: $lng
      imagehashes: $imagehashes
      videohashes: $videohashes
      categories: $categories
    ) {
      author
      author_displayname
      author_profilehash
      imagehashes
      videohashes
      post_id
      created_at
      description
      upvote_count
      downvote_count
      comment_count
      tip_count
      comments
      username
    }
  }
`;

interface Props extends ModalProps {
  hash: string;
}

const CreatePostModal: React.FC<Props> = props => {
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      router.push('/home');
    },
  });

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      content: '',
      imagehashes: [],
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      content: Yup.string().required('Post text is required'),
      imagehashes: Yup.array()
        .of(Yup.string())
        .min(1, 'Post media is required'),
    }),
    onSubmit: ({ content, imagehashes }) => {
      createPost({
        variables: {
          description: content,
          lat: '',
          lng: '',
          imagehashes,
          videohashes: [],
          categories: [1],
        },
      });
    },
  });

  return (
    <ModalWrapper {...props}>
      <Content>
        <header>
          <Title bordered={false} size="small">
            Create Post
          </Title>

          <button onClick={() => props.close()} type="button">
            <img src={closeIcon} alt="close" />
          </button>
        </header>

        <ModalForm formik={formik} hash={props.hash} />
      </Content>
    </ModalWrapper>
  );
};

export default CreatePostModal;
