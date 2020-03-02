import React from 'react';
import styled from 'styled-components';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';

import ModalWrapper, { ModalProps } from '../../common/ModalWrapper';

import Header from './Header';
import ChangeValue from './ChangeValue';
import Form, { SendMoneyFormProps } from './Form';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  padding: 30px;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props extends ModalProps, SendMoneyFormProps {
  handleSubmit?(value: number, to: string): void;
}

const SendMoneyModal: React.FC<Props> = ({ profile, handleSubmit, ...props }) => {
  const formik = useFormik({
    initialValues: {
      to: '',
      value: undefined as number,
      memo: '',
    },
    validationSchema: Yup.object().shape({
      to: Yup.string().required('Username is required'),
      value: Yup.number()
        .required('Value is required')
        .min(1, 'Minimum value is one'),
      memo: Yup.string().max(140, 'Memo should not be more than 140 characters'),
    }),
    validateOnMount: true,
    onSubmit: ({ memo, value, to }) => {
      handleSubmit(value, to);
    },
  });

  return (
    <ModalWrapper {...props}>
      <FormikProvider value={formik}>
        <Container>
          <Header handleClose={props.close} liquidBalance="1,019,847" />

          <ChangeValue />

          <Form profile={profile} />
        </Container>
      </FormikProvider>
    </ModalWrapper>
  );
};

export default SendMoneyModal;
