import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../store/ducks/rootReducer';
import { signRequest } from '../../store/ducks/auth';

import PhoneInput from '../form/PhoneInput';
import Column from '../common/Column';
import Row from '../common/Row';
import Space from '../common/Space';

import JoinCard from './JoinCard';

interface TitleProps {
  green?: boolean;
}
const Title = styled.p<TitleProps>`
  color: ${props => (props.green ? props.theme.green : '#fff')};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
`;

const PhoneForm: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      number: '',
    },
    validationSchema: Yup.object().shape({
      number: Yup.string().required(),
    }),
    validateOnMount: true,
    onSubmit: ({ number }) => {
      dispatch(signRequest(number));
    },
  });

  const { handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Column>
        <Row justify="center">
          <Title>Join </Title>
          <Space width={10} />
          <Title green>KARMA</Title>
        </Row>

        <JoinCard
          label="Login with phone number"
          input={<PhoneInput placeholder="Enter number here" name="number" />}
          legend="You will confirm a 6-digit code then your account will be created for you."
          submitText="Send"
          loading={loading}
          formik={formik}
        />
      </Column>
    </form>
  );
};

export default PhoneForm;
