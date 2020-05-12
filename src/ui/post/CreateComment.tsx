import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import graphql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

import { useRouter } from 'next/router';

import Row from '../common/Row';
import Avatar from '../common/Avatar';
import TextInput from '../form/FormikInput';

import sendComment from '../assets/send-comment.svg';

import { actionRequest, actionSuccess, actionFailure } from '../../store/ducks/action';

const Container = styled(Row)`
  @media (min-width: 549px) {
    position: relative;
  }

  @media (max-width: 550px) {
    width: 100%;
    background: ${props => props.theme.dark};
    padding: 16px 16px 36px;
    border-radius: 25px 25px 0 0;
    box-shadow: 0px 3px 20px #00000099;

    position: fixed;
    bottom: 80px;
    left: 0;
    z-index: 3;
  }
`;

const StyledAvatar = styled(Avatar)`
  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }
`;

const Input = styled(TextInput)`
  margin-left: 5px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 15px;

  input,
  textarea {
    font-size: 15px;
  }

  @media (max-width: 550px) {
    background: #000;
    margin-left: 10px;

    input {
      font-size: 16px;
    }
  }
`;

const sendButtonCss = css`
  position: absolute;
  right: 25px;
  cursor: pointer;

  @media (min-width: 549px) {
    right: 15px;
  }
`;

const CREATE_COMMENT = graphql`
  mutation createComment($text: String!, $post_id: Int!) {
    createComment(text: $text, post_id: $post_id) {
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
  avatar: string;
  onSuccessComment(data: object): void;
}

const CreateComment: React.FC<Props> = ({ avatar, onSuccessComment }) => {
  const [createComment] = useMutation(CREATE_COMMENT);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { comment: '' },
    validationSchema: yup.object().shape({
      comment: yup.string().required('Comment is required'),
    }),
    onSubmit: ({ comment }) => {
      dispatch(actionRequest());
      createComment({ variables: { text: comment, post_id: router.query.id } })
        .then(res => onCreatedComment(res))
        .catch(err => dispatch(actionFailure));
    },
  });

  const { handleSubmit } = formik;

  const onCreatedComment = res => {
    res.data && res.data.createComment && onSuccessComment(res.data.createComment);
    dispatch(actionSuccess());
    formik.setValues({ comment: '' });
  };

  return (
    <FormikProvider value={formik}>
      <Container align="center">
        <StyledAvatar src={avatar} alt="avatar" size="small" />
        <Input placeholder="Write a comment" background="dark" name="comment" />
        <Row align="center" justify="center" onClick={handleSubmit} css={sendButtonCss}>
          <img src={sendComment} alt="Send Comment" />
        </Row>
      </Container>
    </FormikProvider>
  );
};

export default CreateComment;
