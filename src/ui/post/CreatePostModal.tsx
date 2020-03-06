import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const CreatePostModal: React.FC<ModalProps> = props => {
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

        <ModalForm formik={formik} setFiles={setFiles} files={files} />
      </Content>
    </ModalWrapper>
  );
};

export default CreatePostModal;
