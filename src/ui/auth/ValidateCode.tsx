import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../store/ducks/rootReducer';
import { authenticateCodeRequest, resendCodeRequest } from '../../store/ducks/auth';

import CodeInput from '../form/CodeInput';
import Column from '../common/Column';
import Row from '../common/Row';
import Space from '../common/Space';
import Text from '../common/Text';

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

const ValidateCode: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, UserGuid, Author } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().required(),
    }),
    validateOnMount: true,
    onSubmit: ({ code }) => {
      dispatch(authenticateCodeRequest(code));
    },
  });

  const handleResend = useCallback(() => {
    dispatch(resendCodeRequest(UserGuid, Author));
  }, [dispatch, UserGuid, Author]);

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
          label="Enter code below"
          input={<CodeInput name="code" />}
          legend={
            <>
              <Text color="white" size={13} lineHeight="18px">
                Didn’t get a text?
              </Text>{' '}
              <Text cursor="pointer" size={13} color="primary" onClick={() => handleResend()}>
                Send code again
              </Text>
            </>
          }
          submitText="Confirm"
          loading={loading}
          formik={formik}
        />
      </Column>
    </form>
  );
};

export default ValidateCode;
