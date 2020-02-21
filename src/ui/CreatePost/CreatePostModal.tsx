import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import * as Yup from 'yup';

import closeIcon from '../assets/close.svg';

import Title from '../Title';

import ModalForm from './ModalForm';

export const Container = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;

  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40000;
  overflow: auto;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${props => props.theme.dark};
  padding: 30px 50px;
  border-radius: 20px;

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
`;

interface Props {
  open: boolean;
  close: () => void;
}

const CreatePostModal: React.FC<Props> = ({ open, close, ...props }) => {
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      content: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      content: Yup.string().required('Post text is required'),
    }),
    onSubmit: values => {
      console.log(values); //eslint-disable-line no-console
    },
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Container
      id="create-post-modal"
      open={open}
      onClick={e => {
        const container = document.getElementById('create-post-modal');

        if (e.target === container) {
          close();
        }
      }}
      {...props}
    >
      <Content>
        <header>
          <Title bordered={false} size="small">
            Create Post
          </Title>

          <button onClick={close} type="button">
            <img src={closeIcon} alt="close" />
          </button>
        </header>

        <ModalForm formik={formik} setFiles={setFiles} files={files} />
      </Content>
    </Container>
  );
};

export default CreatePostModal;
