import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import graphql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';

import { useRouter } from 'next/router';

import closeIcon from '../assets/close.svg';
import Title from '../common/Title';

import ModalWrapper, { ModalProps } from '../common/ModalWrapper';

import { actionRequest, actionSuccess, actionFailure, fileUploadEnd } from '../../store/ducks/action';

import ModalForm from './ModalForm';

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.dark};
  padding: 30px 50px;
  border-radius: 20px;
  margin-top: 140px;

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
    height: 95vh;
    border-radius: 0;
    padding: 50px 15px;
    margin-top: 0;
  }
`;

const CREATE_POST = graphql`
  mutation createPost(
    $post_id: Int
    $post_type: Int
    $description: String
    $lat: String
    $lng: String
    $imagehashes: [String]
    $videohashes: [String]
    $categories: [Int]
  ) {
    createPost(
      post_id: $post_id
      post_type: $post_type
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
      post_type
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
  const dispatch = useDispatch();
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: res => {
      dispatch(fileUploadEnd());
      if (res && res.createPost) {
        props.close();
        router.push(`/post/${res.createPost.post_id}`);
        dispatch(actionSuccess());
      } else {
        dispatch(actionFailure());
      }
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
      content: Yup.string().required('Post text is required').max(300, 'Password has to be shorter than 300 characters!.'),
    }),
    onSubmit: ({ content, imagehashes }) => {
      dispatch(actionRequest());
      const images = [];
      const videos = [];
      imagehashes.forEach(element => {
        if (element.split('&&')[1] == 'Video') videos.push(element.split('&&')[0]);
        else if (element.split('&&')[1] == 'Image') images.push(element.split('&&')[0]);
      });
      createPost({
        variables: {
          post_id: 0,
          post_type: imagehashes.length > 0 ? 1 : 2,
          description: content,
          lat: '1',
          lng: '2',
          imagehashes: images,
          videohashes: videos,
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

          <button
            onClick={() => {
              props.close();
              dispatch(fileUploadEnd());
            }}
            type="button"
          >
            <img src={closeIcon} alt="close" />
          </button>
        </header>

        <ModalForm formik={formik} hash={props.hash} />
      </Content>
    </ModalWrapper>
  );
};

export default CreatePostModal;
